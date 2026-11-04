#!/usr/bin/env python3
"""Validate active UAES JSON Schema documents against their declared meta-schema."""
from __future__ import annotations

import json
import sys
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

print(f"JSON Schema meta-validation: {checked} schema(s) checked")
if errors:
    for error in errors:
        print(f"FAIL: {error}", file=sys.stderr)
    sys.exit(1)
print("PASS: all active schemas are valid against their declared meta-schemas")
