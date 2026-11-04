/*
Copyright (C) 2023-2026 Uter.ai

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@uter.ai
*/
/**
 * UAES standard-library layout constants.
 *
 * Imported from uaes/p4-design-token-engine. In the product repository these
 * scripts lived in web/scripts/ and resolved paths against web/. In this
 * project the authoritative layout is defined by
 * `.uaes/STANDARD-REGISTRY.yaml` (governance.*) and UAES-05 §6, so every
 * script resolves paths from this module instead of process.cwd().
 */
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const REPO_ROOT = fileURLToPath(new URL('../../../', import.meta.url))
export const DESIGN_ROOT = join(REPO_ROOT, 'design-system')

export const TOKEN_SOURCE = join(DESIGN_ROOT, 'tokens/source/brand.tokens.json')
export const TOKEN_SOURCE_SCHEMA = join(DESIGN_ROOT, 'tokens/source/brand.tokens.schema.json')
export const TOKEN_SOURCE_REL = 'design-system/tokens/source/brand.tokens.json'

export const GENERATED_CSS = join(DESIGN_ROOT, 'tokens/generated/brand.css')
export const GENERATED_CSS_REL = 'design-system/tokens/generated/brand.css'
export const PROJECTED_TOKENS = join(DESIGN_ROOT, 'tokens/source/uaes-tokens.projected.json')

export const UAES_TOKEN_SCHEMA = join(REPO_ROOT, '.uaes/schemas/design-token.schema.json')
export const UAES_CONTRACT_SCHEMA = join(REPO_ROOT, '.uaes/schemas/component-contract.schema.json')
export const REGISTRY_FILE = join(REPO_ROOT, '.uaes/STANDARD-REGISTRY.yaml')

export const COMPONENT_REGISTRY = join(DESIGN_ROOT, 'components/registry/component-registry.json')
export const COMPONENT_IMPLEMENTATION_ROOT = 'design-system/reference/web/src/components/ui'
export const REFERENCE_WEB = join(DESIGN_ROOT, 'reference/web')
export const REFERENCE_WEB_SRC = join(REFERENCE_WEB, 'src')

export const GENERATOR_REL = 'quality/scripts/design-system/generate-design-tokens.mjs'
export const GENERATOR_VERSION = '1.1.0'
