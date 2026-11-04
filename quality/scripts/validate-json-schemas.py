#!/usr/bin/env python3
"""Validate active UAES JSON Schema documents against their declared meta-schema."""
from __future__ import annotations

import json
import sys
import yaml
from pathlib import Path

from jsonschema.validators import validator_for
from jsonschema.exceptions import SchemaError

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
