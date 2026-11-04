#!/usr/bin/env python3
"""Validate active UAES JSON Schema documents against their declared meta-schema."""
from __future__ import annotations

import json
import sys
import yaml
from pathlib import Path

from jsonschema.validators import validator_for
from jsonschema.exceptions import SchemaError
import yaml

ROOT = Path(__file__).resolve().parents[2]
SCHEMA_DIRS = (ROOT / ".uaes" / "schemas", ROOT / "design-system" / "tokens" / "source")
errors: list[str] = []
checked = 0
seen_ids: dict[str, Path] = {}

for directory in SCHEMA_DIRS:
    if not directory.is_dir():
        errors.append(f"required schema directory missing: {directory.relative_to(ROOT)}")
        continue
    for path in sorted(directory.glob("*.schema.json")):
        relative = path.relative_to(ROOT)
        try:
            schema = json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:  # JSON syntax is checked here too.
            errors.append(f"{relative}: invalid JSON: {exc}")
            continue
        if not isinstance(schema, dict):
            errors.append(f"{relative}: schema root must be an object")
            continue
        if not isinstance(schema.get("$schema"), str) or not schema["$schema"]:
            errors.append(f"{relative}: explicit $schema declaration is required")
            continue
        try:
            validator_cls = validator_for(schema)
            validator_cls.check_schema(schema)
        except (SchemaError, Exception) as exc:
            errors.append(f"{relative}: invalid JSON Schema: {exc}")
            continue
        schema_id = schema.get("$id")
        if schema_id:
            previous = seen_ids.get(schema_id)
            if previous:
                errors.append(
                    f"{relative}: duplicate $id {schema_id!r} also used by "
                    f"{previous.relative_to(ROOT)}"
                )
            else:
                seen_ids[schema_id] = path
        checked += 1


# Validate real agent and skill manifest instances, not just schema syntax.
def load_registry(path: Path) -> dict:
    try:
        value = yaml.safe_load(path.read_text(encoding="utf-8"))
        if not isinstance(value, dict):
            raise ValueError("registry root must be a mapping")
        return value
    except Exception as exc:
        errors.append(f"{path.relative_to(ROOT)}: invalid YAML registry: {exc}")
        return {}

def validate_manifest(instance_path: Path, schema_path: Path, expected_id: str | None = None) -> dict:
    try:
        instance = json.loads(instance_path.read_text(encoding="utf-8"))
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        validator = validator_for(schema)(schema)
        issues = sorted(validator.iter_errors(instance), key=lambda e: list(e.path))
        for issue in issues:
            errors.append(
                f"{instance_path.relative_to(ROOT)}: {list(issue.path)}: {issue.message}"
            )
        if expected_id and instance.get("skillId") != expected_id:
            errors.append(
                f"{instance_path.relative_to(ROOT)}: skillId does not match registry ID {expected_id}"
            )
        return instance
    except Exception as exc:
        errors.append(f"{instance_path.relative_to(ROOT)}: manifest validation error: {exc}")
        return {}

skill_registry = load_registry(ROOT / "skills" / "registry.yaml")
skill_entries = skill_registry.get("skills", [])
skill_ids = [entry.get("id") for entry in skill_entries]
skill_names = [entry.get("name") for entry in skill_entries]
if len(skill_ids) != len(set(skill_ids)):
    errors.append("skills/registry.yaml: duplicate skill IDs")
if len(skill_names) != len(set(skill_names)):
    errors.append("skills/registry.yaml: duplicate skill names")
known_skill_ids = set(skill_ids)

skill_schema = ROOT / ".uaes" / "schemas" / "skill-manifest.schema.json"
for entry in skill_entries:
    manifest_path = ROOT / entry.get("manifest", "")
    contract_path = ROOT / entry.get("skill", "")
    if not manifest_path.is_file():
        errors.append(f"skills/registry.yaml: missing manifest {entry.get('manifest')}")
        continue
    if not contract_path.is_file():
        errors.append(f"skills/registry.yaml: missing skill contract {entry.get('skill')}")
    manifest = validate_manifest(manifest_path, skill_schema, entry.get("id"))
    if manifest and manifest.get("name") != entry.get("name"):
        errors.append(f"{entry.get('manifest')}: name does not match skill registry")
    if manifest and manifest.get("sideEffects") != entry.get("sideEffects"):
        errors.append(f"{entry.get('manifest')}: sideEffects does not match skill registry")
    for field in ("inputSchema", "outputSchema"):
        schema_ref = manifest.get(field)
        if schema_ref and not (ROOT / schema_ref).is_file():
            errors.append(f"{entry.get('manifest')}: missing {field} reference {schema_ref}")

agent_registry = load_registry(ROOT / "agents" / "registry.yaml")
agent_schema = ROOT / ".uaes" / "schemas" / "agent-manifest.schema.json"
for entry in agent_registry.get("agents", []):
    manifest_path = ROOT / entry.get("manifest", "")
    if not manifest_path.is_file():
        errors.append(f"agents/registry.yaml: missing manifest {entry.get('manifest')}")
        continue
    manifest = validate_manifest(manifest_path, agent_schema)
    for skill_id in manifest.get("skillRefs", []):
        if skill_id not in known_skill_ids:
            errors.append(f"{entry.get('manifest')}: unregistered skillRef {skill_id}")

print(
    f"Manifest instance validation: {len(skill_entries)} skill(s), "
    f"{len(agent_registry.get('agents', []))} agent(s)"
)

# Negative control: prove that the installed meta-schema validator rejects an
# invalid schema, rather than merely accepting every input.
try:
    validator_for({"$schema": "https://json-schema.org/draft/2020-12/schema"}).check_schema(
        {"type": "not-a-valid-json-schema-type"}
    )
except SchemaError:
    print("PASS: negative control rejected an invalid schema")
else:
    errors.append("negative control failed: invalid schema was accepted")


# Validate the global registry and registered manifest instances against their
# schemas, in addition to checking each schema against its declared meta-schema.
def load_yaml_instance(relative: str):
    try:
        return yaml.safe_load((ROOT / relative).read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{relative}: invalid YAML: {exc}")
        return {}

def validate_instance(schema_name: str, instance: dict, label: str):
    schema_path = ROOT / ".uaes" / "schemas" / schema_name
    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        validator_cls = validator_for(schema)
        validator = validator_cls(schema)
        instance_errors = sorted(validator.iter_errors(instance), key=lambda e: list(e.path))
        if instance_errors:
            for error in instance_errors:
                location = ".".join(str(part) for part in error.path) or "<root>"
                errors.append(f"{label} at {location}: {error.message}")
        else:
            print(f"PASS: schema instance {label}")
    except Exception as exc:
        errors.append(f"{label}: schema validation could not run: {exc}")

registry = load_yaml_instance(".uaes/STANDARD-REGISTRY.yaml")
validate_instance("standard-registry.schema.json", registry, ".uaes/STANDARD-REGISTRY.yaml")

agents_registry = load_yaml_instance("agents/registry.yaml")
for agent in agents_registry.get("agents", []):
    manifest_path = agent.get("manifest")
    if not manifest_path:
        errors.append(f"agent {agent.get('id', '(unknown)')}: manifest path missing")
        continue
    try:
        manifest = json.loads((ROOT / manifest_path).read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{manifest_path}: invalid JSON: {exc}")
        continue
    validate_instance("agent-manifest.schema.json", manifest, manifest_path)

skills_registry = load_yaml_instance("skills/registry.yaml")
for skill in skills_registry.get("skills", []):
    manifest_path = skill.get("manifest")
    if not manifest_path:
        errors.append(f"skill {skill.get('id', '(unknown)')}: manifest path missing")
        continue
    try:
        manifest = json.loads((ROOT / manifest_path).read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{manifest_path}: invalid JSON: {exc}")
        continue
    validate_instance("skill-manifest.schema.json", manifest, manifest_path)
    for key in ("inputSchema", "outputSchema"):
        reference = manifest.get(key)
        if not reference or not (ROOT / reference).is_file():
            errors.append(f"{manifest_path}: missing referenced {key}: {reference}")

print(f"JSON Schema meta-validation: {checked} schema(s) checked; registered instances validated")
if errors:
    for error in errors:
        print(f"FAIL: {error}", file=sys.stderr)
    sys.exit(1)
print("PASS: all active schemas are valid against their declared meta-schemas")
