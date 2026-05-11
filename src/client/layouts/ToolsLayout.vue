<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/BackToTop.vue'
import MonacoEditor from '../components/tools/MonacoEditor.vue'

type Tool = {
  id: string
  name: string
  from: string
  to: string
  group: string
  description: string
  placeholder: string
  inputLanguage: string
  outputLanguage: string
  transform: (input: string) => string
}

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue }

const route = useRoute()
const router = useRouter()
const copied = ref(false)
const query = ref('')
const favoriteIds = ref<string[]>([])
const recentIds = ref<string[]>([])
const activeId = ref(typeof route.query.tool === 'string' ? route.query.tool : 'json-ts')
const input = ref(`{
  "name": "Alex Chen",
  "role": "Product Engineer",
  "active": true,
  "skills": ["TypeScript", "React", "Node.js", "PostgreSQL"],
  "profile": {
    "website": "https://example.com",
    "email": "alex@example.com"
  }
}`)

const sampleGraphql = `type User {
  id: ID!
  name: String!
  email: String
  skills: [String!]!
  aiNative: Boolean!
}`

const sampleSql = `CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP
);`

const toPascalCase = (value: string): string => {
  const result = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join('')
  return result || 'Root'
}

const toCamelCase = (value: string): string => {
  const pascal = toPascalCase(value)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

const isObject = (value: JsonValue): value is { [key: string]: JsonValue } =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

const safeJsonParse = (inputValue: string): JsonValue => JSON.parse(inputValue) as JsonValue

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const unquoteKey = (key: string): string => (/^[a-zA-Z_$][\w$]*$/.test(key) ? key : JSON.stringify(key))

const jsonToTypeScript = (source: string): string => {
  const root = safeJsonParse(source)
  const declarations: string[] = []
  const seen = new Set<string>()

  const infer = (value: JsonValue, name: string): string => {
    if (value === null) return 'null'
    if (Array.isArray(value)) {
      if (!value.length) return 'unknown[]'
      const types = Array.from(new Set(value.map((item) => infer(item, name))))
      return types.length === 1 ? `${types[0]}[]` : `Array<${types.join(' | ')}>`
    }
    if (isObject(value)) {
      const interfaceName = toPascalCase(name)
      if (!seen.has(interfaceName)) {
        seen.add(interfaceName)
        const fields = Object.entries(value)
          .map(([key, val]) => `  ${unquoteKey(key)}: ${infer(val, key)};`)
          .join('\n')
        declarations.push(`export interface ${interfaceName} {\n${fields}\n}`)
      }
      return interfaceName
    }
    return typeof value
  }

  const rootType = infer(root, 'Root')
  if (!isObject(root)) declarations.push(`export type Root = ${rootType}`)
  return declarations.join('\n\n')
}

const jsonSchemaFor = (value: JsonValue): Record<string, unknown> => {
  if (value === null) return { type: 'null' }
  if (Array.isArray(value)) return { type: 'array', items: value[0] === undefined ? {} : jsonSchemaFor(value[0]) }
  if (isObject(value)) {
    const properties: Record<string, unknown> = {}
    Object.entries(value).forEach(([key, val]) => {
      properties[key] = jsonSchemaFor(val)
    })
    return { type: 'object', properties, required: Object.keys(value) }
  }
  return { type: typeof value }
}

const jsonToSchema = (source: string): string => {
  const root = safeJsonParse(source)
  return JSON.stringify({ $schema: 'https://json-schema.org/draft/2020-12/schema', ...jsonSchemaFor(root) }, null, 2)
}

const yamlScalar = (value: JsonValue): string => {
  if (value === null) return 'null'
  if (typeof value === 'string') return /[:#\n{}[\],&*?|-]|^\s|\s$/.test(value) ? JSON.stringify(value) : value
  return String(value)
}

const jsonToYamlValue = (value: JsonValue, indent = 0): string => {
  const pad = '  '.repeat(indent)
  if (Array.isArray(value)) {
    if (!value.length) return '[]'
    return value
      .map((item) => {
        if (isObject(item) || Array.isArray(item)) return `${pad}-\n${jsonToYamlValue(item, indent + 1)}`
        return `${pad}- ${yamlScalar(item)}`
      })
      .join('\n')
  }
  if (isObject(value)) {
    const entries = Object.entries(value)
    if (!entries.length) return '{}'
    return entries
      .map(([key, val]) => {
        if (isObject(val) || Array.isArray(val)) return `${pad}${key}:\n${jsonToYamlValue(val, indent + 1)}`
        return `${pad}${key}: ${yamlScalar(val)}`
      })
      .join('\n')
  }
  return `${pad}${yamlScalar(value)}`
}

const jsonToYaml = (source: string): string => jsonToYamlValue(safeJsonParse(source))

const jsonToCsv = (source: string): string => {
  const root = safeJsonParse(source)
  const rows = Array.isArray(root) ? root : [root]
  if (!rows.every(isObject)) throw new Error('CSV 转换需要 JSON 对象或对象数组')
  const keys = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
  const cell = (value: JsonValue | undefined): string => {
    if (value === undefined || value === null) return ''
    const raw = isObject(value) || Array.isArray(value) ? JSON.stringify(value) : String(value)
    return /[",\n]/.test(raw) ? `"${raw.replace(/"/g, '""')}"` : raw
  }
  return [keys.join(','), ...rows.map((row) => keys.map((key) => cell(row[key])).join(','))].join('\n')
}

const goType = (value: JsonValue, name: string, declarations: string[]): string => {
  if (value === null) return 'any'
  if (Array.isArray(value)) return value.length ? `[]${goType(value[0], name, declarations)}` : '[]any'
  if (isObject(value)) {
    const typeName = toPascalCase(name)
    const fields = Object.entries(value)
      .map(([key, val]) => `\t${toPascalCase(key)} ${goType(val, key, declarations)} \`json:"${key}"\``)
      .join('\n')
    declarations.push(`type ${typeName} struct {\n${fields}\n}`)
    return typeName
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'float64'
  if (typeof value === 'boolean') return 'bool'
  return 'string'
}

const jsonToGo = (source: string): string => {
  const declarations: string[] = []
  goType(safeJsonParse(source), 'Root', declarations)
  return Array.from(new Set(declarations.reverse())).join('\n\n')
}

const kotlinType = (value: JsonValue, name: string, declarations: string[]): string => {
  if (value === null) return 'Any?'
  if (Array.isArray(value)) return value.length ? `List<${kotlinType(value[0], name, declarations)}>` : 'List<Any>'
  if (isObject(value)) {
    const typeName = toPascalCase(name)
    const fields = Object.entries(value)
      .map(([key, val]) => `  val ${toCamelCase(key)}: ${kotlinType(val, key, declarations)}`)
      .join(',\n')
    declarations.push(`data class ${typeName}(\n${fields}\n)`)
    return typeName
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Double'
  if (typeof value === 'boolean') return 'Boolean'
  return 'String'
}

const jsonToKotlin = (source: string): string => {
  const declarations: string[] = []
  kotlinType(safeJsonParse(source), 'Root', declarations)
  return Array.from(new Set(declarations.reverse())).join('\n\n')
}

const swiftType = (value: JsonValue, name: string, declarations: string[]): string => {
  if (value === null) return 'String?'
  if (Array.isArray(value)) return value.length ? `[${swiftType(value[0], name, declarations)}]` : '[Any]'
  if (isObject(value)) {
    const typeName = toPascalCase(name)
    const fields = Object.entries(value)
      .map(([key, val]) => `  let ${toCamelCase(key)}: ${swiftType(val, key, declarations)}`)
      .join('\n')
    declarations.push(`struct ${typeName}: Codable {\n${fields}\n}`)
    return typeName
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Double'
  if (typeof value === 'boolean') return 'Bool'
  return 'String'
}

const jsonToSwift = (source: string): string => {
  const declarations: string[] = []
  swiftType(safeJsonParse(source), 'Root', declarations)
  return Array.from(new Set(declarations.reverse())).join('\n\n')
}

const rustType = (value: JsonValue, name: string, declarations: string[]): string => {
  if (value === null) return 'Option<String>'
  if (Array.isArray(value)) return value.length ? `Vec<${rustType(value[0], name, declarations)}>` : 'Vec<serde_json::Value>'
  if (isObject(value)) {
    const typeName = toPascalCase(name)
    const fields = Object.entries(value)
      .map(([key, val]) => `    pub ${toCamelCase(key)}: ${rustType(val, key, declarations)},`)
      .join('\n')
    declarations.push(`#[derive(Debug, Serialize, Deserialize)]\npub struct ${typeName} {\n${fields}\n}`)
    return typeName
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'i64' : 'f64'
  if (typeof value === 'boolean') return 'bool'
  return 'String'
}

const jsonToRust = (source: string): string => {
  const declarations: string[] = ['use serde::{Deserialize, Serialize};']
  const structs: string[] = []
  rustType(safeJsonParse(source), 'Root', structs)
  return declarations.concat(Array.from(new Set(structs.reverse()))).join('\n\n')
}

const dartType = (value: JsonValue, name: string, declarations: string[]): string => {
  if (value === null) return 'dynamic'
  if (Array.isArray(value)) return value.length ? `List<${dartType(value[0], name, declarations)}>` : 'List<dynamic>'
  if (isObject(value)) {
    const typeName = toPascalCase(name)
    const fields = Object.entries(value)
      .map(([key, val]) => `  final ${dartType(val, key, declarations)} ${toCamelCase(key)};`)
      .join('\n')
    const params = Object.keys(value).map((key) => `    required this.${toCamelCase(key)},`).join('\n')
    declarations.push(`class ${typeName} {\n${fields}\n\n  const ${typeName}({\n${params}\n  });\n}`)
    return typeName
  }
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double'
  if (typeof value === 'boolean') return 'bool'
  return 'String'
}

const jsonToDart = (source: string): string => {
  const declarations: string[] = []
  dartType(safeJsonParse(source), 'Root', declarations)
  return Array.from(new Set(declarations.reverse())).join('\n\n')
}

const zodType = (value: JsonValue, name: string, declarations: string[]): string => {
  if (value === null) return 'z.null()'
  if (Array.isArray(value)) return value.length ? `z.array(${zodType(value[0], name, declarations)})` : 'z.array(z.unknown())'
  if (isObject(value)) {
    const schemaName = `${toPascalCase(name)}Schema`
    const fields = Object.entries(value)
      .map(([key, val]) => `  ${unquoteKey(key)}: ${zodType(val, key, declarations)},`)
      .join('\n')
    declarations.push(`export const ${schemaName} = z.object({\n${fields}\n})`)
    return schemaName
  }
  if (typeof value === 'number') return 'z.number()'
  if (typeof value === 'boolean') return 'z.boolean()'
  return 'z.string()'
}

const jsonToZod = (source: string): string => {
  const declarations: string[] = ['import { z } from "zod"']
  const schemas: string[] = []
  zodType(safeJsonParse(source), 'Root', schemas)
  return declarations.concat(Array.from(new Set(schemas.reverse()))).join('\n\n')
}

const prismaType = (value: JsonValue): string => {
  if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Float'
  if (typeof value === 'boolean') return 'Boolean'
  if (value === null) return 'String?'
  if (Array.isArray(value)) return 'Json'
  if (isObject(value)) return 'Json'
  return 'String'
}

const jsonToPrisma = (source: string): string => {
  const root = safeJsonParse(source)
  const obj = Array.isArray(root) ? root.find(isObject) : root
  if (!isObject(obj)) throw new Error('Prisma model 需要 JSON 对象或对象数组')
  const fields = Object.entries(obj)
    .map(([key, val]) => {
      const field = toCamelCase(key)
      const type = field.toLowerCase() === 'id' ? 'String @id @default(cuid())' : prismaType(val)
      return `  ${field} ${type}`
    })
    .join('\n')
  return `model Root {\n${fields}\n}`
}

const parseYamlScalar = (raw: string): JsonValue => {
  const value = raw.trim()
  if (value === 'null' || value === '~') return null
  if (value === 'true') return true
  if (value === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) return value.slice(1, -1)
  return value
}

const simpleYamlToJsonValue = (source: string): JsonValue => {
  const lines = source.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith('#'))
  const root: Record<string, JsonValue> = {}
  const stack: Array<{ indent: number; value: Record<string, JsonValue> | JsonValue[] }> = [{ indent: -1, value: root }]

  lines.forEach((line, index) => {
    const indent = line.match(/^\s*/)?.[0].length || 0
    const trimmed = line.trim()
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop()
    const parent = stack[stack.length - 1].value

    if (trimmed.startsWith('- ')) {
      if (!Array.isArray(parent)) throw new Error('当前简易 YAML 解析器仅支持 key: 下的数组')
      parent.push(parseYamlScalar(trimmed.slice(2)))
      return
    }

    const splitIndex = trimmed.indexOf(':')
    if (splitIndex === -1 || Array.isArray(parent)) throw new Error('无法解析该 YAML 行：' + line)
    const key = trimmed.slice(0, splitIndex).trim()
    const rest = trimmed.slice(splitIndex + 1).trim()
    if (rest) {
      parent[key] = parseYamlScalar(rest)
      return
    }
    const nextTrimmed = lines[index + 1]?.trim() || ''
    const child: Record<string, JsonValue> | JsonValue[] = nextTrimmed.startsWith('- ') ? [] : {}
    parent[key] = child
    stack.push({ indent, value: child })
  })
  return root
}

const yamlToJson = (source: string): string => JSON.stringify(simpleYamlToJsonValue(source), null, 2)

const xmlNodeToJson = (node: Element): JsonValue => {
  const obj: Record<string, JsonValue> = {}
  Array.from(node.attributes).forEach((attr) => {
    obj[`@${attr.name}`] = attr.value
  })
  const children = Array.from(node.children)
  const text = node.textContent?.trim() || ''
  if (!children.length) return Object.keys(obj).length ? { ...obj, '#text': text } : text
  children.forEach((child) => {
    const value = xmlNodeToJson(child)
    if (obj[child.tagName]) {
      const current = obj[child.tagName]
      obj[child.tagName] = Array.isArray(current) ? [...current, value] : [current, value]
    } else {
      obj[child.tagName] = value
    }
  })
  return obj
}

const xmlToJson = (source: string): string => {
  if (typeof window === 'undefined') return '请在浏览器中使用 XML 转换'
  const doc = new DOMParser().parseFromString(source, 'application/xml')
  if (doc.querySelector('parsererror')) throw new Error('XML 解析失败，请检查标签是否闭合')
  const root = doc.documentElement
  return JSON.stringify({ [root.tagName]: xmlNodeToJson(root) }, null, 2)
}

const markdownToHtml = (source: string): string => {
  const lines = source.split(/\r?\n/)
  const html: string[] = []
  let inList = false
  lines.forEach((line) => {
    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h${heading[1].length}>${escapeHtml(heading[2])}</h${heading[1].length}>`)
      return
    }
    const escaped = escapeHtml(line)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    const list = escaped.match(/^[-*]\s+(.+)$/)
    if (list) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`  <li>${list[1]}</li>`)
      return
    }
    if (inList) {
      html.push('</ul>')
      inList = false
    }
    if (line.trim()) html.push(`<p>${escaped}</p>`)
  })
  if (inList) html.push('</ul>')
  return html.join('\n')
}

const htmlToJsx = (source: string): string => {
  const styleToJsx = (_match: string, style: string): string => {
    const body = style
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [rawKey, ...rawValue] = item.split(':')
        const key = rawKey.trim().replace(/-([a-z])/g, (_: string, char: string) => char.toUpperCase())
        return `${key}: ${JSON.stringify(rawValue.join(':').trim())}`
      })
      .join(', ')
    return `style={{ ${body} }}`
  }
  return source
    .replace(/\bclass=/g, 'className=')
    .replace(/\bfor=/g, 'htmlFor=')
    .replace(/\btabindex=/g, 'tabIndex=')
    .replace(/\bviewbox=/g, 'viewBox=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\bstroke-linecap=/g, 'strokeLinecap=')
    .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/\bfill-rule=/g, 'fillRule=')
    .replace(/\bclip-rule=/g, 'clipRule=')
    .replace(/style="([^"]*)"/g, styleToJsx)
    .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
}

const svgToJsx = (source: string): string => htmlToJsx(source)

const cssToJsObject = (source: string): string => {
  const result: Record<string, Record<string, string>> = {}
  const blocks = source.matchAll(/([^{}]+)\{([^{}]+)\}/g)
  Array.from(blocks).forEach((match) => {
    const selector = match[1].trim()
    const declarations: Record<string, string> = {}
    match[2]
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((decl) => {
        const [rawKey, ...rawValue] = decl.split(':')
        const key = rawKey.trim().replace(/-([a-z])/g, (_: string, char: string) => char.toUpperCase())
        declarations[key] = rawValue.join(':').trim()
      })
    result[selector] = declarations
  })
  return JSON.stringify(result, null, 2)
}

const graphqlToTypeScript = (source: string): string => {
  const scalars: Record<string, string> = { ID: 'string', String: 'string', Int: 'number', Float: 'number', Boolean: 'boolean' }
  return Array.from(source.matchAll(/type\s+(\w+)\s*\{([\s\S]*?)\}/g))
    .map((typeMatch) => {
      const name = typeMatch[1]
      const fields = typeMatch[2]
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const field = line.match(/^(\w+)\s*:\s*([\[\]\w!]+)/)
          if (!field) return ''
          const required = field[2].endsWith('!')
          const clean = field[2].replace(/!/g, '')
          const isList = clean.startsWith('[')
          const base = clean.replace(/[\[\]]/g, '')
          const tsType = scalars[base] || base
          return `  ${field[1]}${required ? '' : '?'}: ${isList ? `${tsType}[]` : tsType};`
        })
        .filter(Boolean)
        .join('\n')
      return `export interface ${name} {\n${fields}\n}`
    })
    .join('\n\n')
}

const sqlTypeToPrisma = (rawType: string): string => {
  const type = rawType.toUpperCase()
  if (/INT|SERIAL/.test(type)) return 'Int'
  if (/BIGINT/.test(type)) return 'BigInt'
  if (/BOOL/.test(type)) return 'Boolean'
  if (/DOUBLE|FLOAT|DECIMAL|NUMERIC|REAL/.test(type)) return 'Float'
  if (/DATE|TIME/.test(type)) return 'DateTime'
  if (/JSON/.test(type)) return 'Json'
  return 'String'
}

const sqlToPrisma = (source: string): string => {
  const match = source.match(/CREATE\s+TABLE\s+[`"]?(\w+)[`"]?\s*\(([\s\S]*?)\)\s*;?/i)
  if (!match) throw new Error('仅支持基础 CREATE TABLE 语句')
  const modelName = toPascalCase(match[1])
  const fields = match[2]
    .split(',')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^(PRIMARY|FOREIGN|KEY|UNIQUE|CONSTRAINT)/i.test(line))
    .map((line) => {
      const field = line.match(/^[`"]?(\w+)[`"]?\s+([\w()]+)/)
      if (!field) return ''
      const name = toCamelCase(field[1])
      const isRequired = /NOT\s+NULL|PRIMARY\s+KEY/i.test(line)
      const isPrimary = /PRIMARY\s+KEY/i.test(line)
      const defaultId = isPrimary && /INT|SERIAL/i.test(field[2]) ? ' @id @default(autoincrement())' : isPrimary ? ' @id' : ''
      return `  ${name} ${sqlTypeToPrisma(field[2])}${isRequired ? '' : '?'}${defaultId}`
    })
    .filter(Boolean)
    .join('\n')
  return `model ${modelName} {\n${fields}\n}`
}

const formatJson = (source: string): string => JSON.stringify(JSON.parse(source), null, 2)

const formatSql = (source: string): string => {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'VALUES', 'SET']
  let result = source.replace(/\s+/g, ' ').trim()
  keywords.forEach((keyword) => {
    result = result.replace(new RegExp(`\\s+${keyword}\\s+`, 'gi'), `\n${keyword} `)
  })
  return result.replace(/,\s*/g, ',\n  ').replace(/\(\s*/g, '(\n  ').replace(/\s*\)/g, '\n)')
}

const formatCss = (source: string): string =>
  source
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*}\s*/g, '\n}\n\n')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim()

const formatHtml = (source: string): string => {
  const tokens = source.replace(/></g, '>\n<').split(/\n/)
  let indent = 0
  return tokens
    .map((token) => {
      const trimmed = token.trim()
      if (!trimmed) return ''
      if (/^<\//.test(trimmed)) indent = Math.max(indent - 1, 0)
      const line = `${'  '.repeat(indent)}${trimmed}`
      if (/^<[^!?/][^>]*[^/]?>$/.test(trimmed) && !/^<(input|img|br|hr|meta|link)/i.test(trimmed)) indent += 1
      return line
    })
    .filter(Boolean)
    .join('\n')
}

const tools: Tool[] = [
  { id: 'json-ts', name: 'JSON → TypeScript', from: 'JSON', to: 'TypeScript', group: 'JSON', description: '根据 JSON 自动推导 TypeScript interface。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'typescript', transform: jsonToTypeScript },
  { id: 'json-schema', name: 'JSON → JSON Schema', from: 'JSON', to: 'JSON Schema', group: 'JSON', description: '把示例 JSON 转成基础 JSON Schema。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'json', transform: jsonToSchema },
  { id: 'json-yaml', name: 'JSON → YAML', from: 'JSON', to: 'YAML', group: 'JSON', description: '将 JSON 数据转为 YAML。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'yaml', transform: jsonToYaml },
  { id: 'json-csv', name: 'JSON → CSV', from: 'JSON', to: 'CSV', group: 'JSON', description: '将对象或对象数组转成 CSV。', placeholder: '[{ "name": "Alex Chen", "role": "Engineer" }]', inputLanguage: 'json', outputLanguage: 'plaintext', transform: jsonToCsv },
  { id: 'json-go', name: 'JSON → Go Struct', from: 'JSON', to: 'Go Struct', group: 'JSON', description: '根据 JSON 生成 Go 结构体。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'go', transform: jsonToGo },
  { id: 'json-kotlin', name: 'JSON → Kotlin', from: 'JSON', to: 'Kotlin', group: 'JSON', description: '根据 JSON 生成 Kotlin data class。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'kotlin', transform: jsonToKotlin },
  { id: 'json-swift', name: 'JSON → Swift', from: 'JSON', to: 'Swift', group: 'JSON', description: '根据 JSON 生成 Swift Codable struct。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'swift', transform: jsonToSwift },
  { id: 'json-rust', name: 'JSON → Rust', from: 'JSON', to: 'Rust', group: 'JSON', description: '根据 JSON 生成 Rust serde struct。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'rust', transform: jsonToRust },
  { id: 'json-dart', name: 'JSON → Dart', from: 'JSON', to: 'Dart', group: 'JSON', description: '根据 JSON 生成 Dart class。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'dart', transform: jsonToDart },
  { id: 'json-zod', name: 'JSON → Zod', from: 'JSON', to: 'Zod Schema', group: 'JSON', description: '根据 JSON 生成 Zod 校验模型。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'typescript', transform: jsonToZod },
  { id: 'json-prisma', name: 'JSON → Prisma', from: 'JSON', to: 'Prisma Model', group: 'JSON', description: '根据 JSON 对象生成基础 Prisma model。', placeholder: input.value, inputLanguage: 'json', outputLanguage: 'prisma', transform: jsonToPrisma },
  { id: 'format-json', name: 'JSON Format', from: 'JSON', to: 'Formatted JSON', group: 'Formatters', description: '格式化 JSON。', placeholder: '{"name":"Alex Chen","skills":["AI","Full Stack"]}', inputLanguage: 'json', outputLanguage: 'json', transform: formatJson },
  { id: 'format-sql', name: 'SQL Format', from: 'SQL', to: 'Formatted SQL', group: 'Formatters', description: '格式化常见 SQL 语句。', placeholder: 'select id,name,email from users where ai_native = true order by id desc', inputLanguage: 'sql', outputLanguage: 'sql', transform: formatSql },
  { id: 'format-css', name: 'CSS Format', from: 'CSS', to: 'Formatted CSS', group: 'Formatters', description: '格式化 CSS 代码。', placeholder: '.card{color:#fff;font-size:16px}.title{font-weight:700}', inputLanguage: 'css', outputLanguage: 'css', transform: formatCss },
  { id: 'format-html', name: 'HTML Format', from: 'HTML', to: 'Formatted HTML', group: 'Formatters', description: '格式化 HTML 结构。', placeholder: '<section><h1>Alex Chen</h1><p>AI Native Developer</p></section>', inputLanguage: 'html', outputLanguage: 'html', transform: formatHtml },
  { id: 'yaml-json', name: 'YAML → JSON', from: 'YAML', to: 'JSON', group: 'Others', description: '将常见 YAML 键值结构转成 JSON。', placeholder: 'name: Alex Chen\nrole: Engineer\nskills:\n  - TypeScript\n  - AI', inputLanguage: 'yaml', outputLanguage: 'json', transform: yamlToJson },
  { id: 'xml-json', name: 'XML → JSON', from: 'XML', to: 'JSON', group: 'Others', description: '将 XML 文档转换成 JSON 对象。', placeholder: '<user><name>Alex Chen</name><role>Engineer</role></user>', inputLanguage: 'xml', outputLanguage: 'json', transform: xmlToJson },
  { id: 'md-html', name: 'Markdown → HTML', from: 'Markdown', to: 'HTML', group: 'Others', description: '支持标题、段落、列表、加粗、链接、行内代码等常用语法。', placeholder: '# Hello\n\n**AI Native** developer', inputLanguage: 'markdown', outputLanguage: 'html', transform: markdownToHtml },
  { id: 'html-jsx', name: 'HTML → JSX', from: 'HTML', to: 'JSX', group: 'HTML / SVG', description: '将 HTML 属性转换成 JSX 常用写法。', placeholder: '<label class="title" for="name">Name</label>', inputLanguage: 'html', outputLanguage: 'javascript', transform: htmlToJsx },
  { id: 'svg-jsx', name: 'SVG → JSX', from: 'SVG', to: 'JSX', group: 'HTML / SVG', description: '将 SVG 属性转换成 JSX 写法。', placeholder: '<svg viewbox="0 0 24 24"><path stroke-width="2" d="M4 12h16" /></svg>', inputLanguage: 'xml', outputLanguage: 'javascript', transform: svgToJsx },
  { id: 'css-js', name: 'CSS → JS Objects', from: 'CSS', to: 'JS Object', group: 'CSS', description: '将 CSS 规则转换为可读的 JS 对象。', placeholder: '.card { color: red; font-size: 16px; }', inputLanguage: 'css', outputLanguage: 'json', transform: cssToJsObject },
  { id: 'sql-prisma', name: 'SQL → Prisma', from: 'SQL', to: 'Prisma Model', group: 'Database', description: '将基础 CREATE TABLE 转成 Prisma model。', placeholder: sampleSql, inputLanguage: 'sql', outputLanguage: 'prisma', transform: sqlToPrisma },
  { id: 'graphql-ts', name: 'GraphQL → TypeScript', from: 'GraphQL', to: 'TypeScript', group: 'GraphQL', description: '将基础 GraphQL type 转成 TypeScript interface。', placeholder: sampleGraphql, inputLanguage: 'graphql', outputLanguage: 'typescript', transform: graphqlToTypeScript },
]

const toolMap = computed(() => new Map(tools.map((tool) => [tool.id, tool])))
const activeTool = computed(() => toolMap.value.get(activeId.value) || tools[0])
const favoriteTools = computed(() => favoriteIds.value.map((id) => toolMap.value.get(id)).filter(Boolean) as Tool[])
const recentTools = computed(() => recentIds.value.map((id) => toolMap.value.get(id)).filter(Boolean) as Tool[])
const isFavorite = computed(() => favoriteIds.value.includes(activeTool.value.id))

const filteredTools = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return tools
  return tools.filter((tool) => [tool.name, tool.from, tool.to, tool.group, tool.description].join(' ').toLowerCase().includes(keyword))
})

const groupedTools = computed(() => {
  return filteredTools.value.reduce<Record<string, Tool[]>>((res, tool) => {
    res[tool.group] = res[tool.group] || []
    res[tool.group].push(tool)
    return res
  }, {})
})

const output = computed(() => {
  if (!input.value.trim()) return ''
  try {
    return activeTool.value.transform(input.value)
  } catch (error) {
    return `转换失败：${error instanceof Error ? error.message : String(error)}`
  }
})

const persist = (): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('lizhi-tools-favorites', JSON.stringify(favoriteIds.value))
  localStorage.setItem('lizhi-tools-recents', JSON.stringify(recentIds.value))
}

const addRecent = (id: string): void => {
  recentIds.value = [id, ...recentIds.value.filter((item) => item !== id)].slice(0, 8)
  persist()
}

const selectTool = (tool: Tool, shouldReplaceInput = true): void => {
  activeId.value = tool.id
  if (shouldReplaceInput) input.value = tool.placeholder
  copied.value = false
  addRecent(tool.id)
  router.replace({ query: { ...route.query, tool: tool.id } })
}

const toggleFavorite = (): void => {
  const id = activeTool.value.id
  favoriteIds.value = favoriteIds.value.includes(id)
    ? favoriteIds.value.filter((item) => item !== id)
    : [id, ...favoriteIds.value]
  persist()
}

const copyOutput = async (): Promise<void> => {
  if (!output.value || typeof navigator === 'undefined') return
  await navigator.clipboard.writeText(output.value)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1800)
}

const clearInput = (): void => {
  input.value = ''
  copied.value = false
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    favoriteIds.value = JSON.parse(localStorage.getItem('lizhi-tools-favorites') || '[]')
    recentIds.value = JSON.parse(localStorage.getItem('lizhi-tools-recents') || '[]')
  }
  const id = typeof route.query.tool === 'string' ? route.query.tool : activeId.value
  const tool = toolMap.value.get(id)
  if (tool) selectTool(tool, true)
  else selectTool(tools[0], true)
})

watch(
  () => route.query.tool,
  (toolId) => {
    if (typeof toolId !== 'string' || toolId === activeId.value) return
    const tool = toolMap.value.get(toolId)
    if (tool) selectTool(tool)
  }
)
</script>

<template>
  <div class="tools-page">
    <main class="tools-shell">
      <aside class="tools-sidebar">
        <div class="tool-search">
          <input v-model="query" type="search" placeholder="搜索 JSON / TypeScript / YAML..." />
        </div>

        <div v-if="favoriteTools.length" class="tool-group pinned-group">
          <h2>Favorites</h2>
          <button
            v-for="tool in favoriteTools"
            :key="`favorite-${tool.id}`"
            class="tool-nav-item"
            :class="{ active: tool.id === activeTool.id }"
            type="button"
            @click="selectTool(tool)"
          >
            <span>★ {{ tool.name }}</span>
            <small>{{ tool.from }} → {{ tool.to }}</small>
          </button>
        </div>

        <div v-if="recentTools.length" class="tool-group pinned-group">
          <h2>Recent</h2>
          <button
            v-for="tool in recentTools"
            :key="`recent-${tool.id}`"
            class="tool-nav-item compact"
            :class="{ active: tool.id === activeTool.id }"
            type="button"
            @click="selectTool(tool)"
          >
            <span>{{ tool.name }}</span>
          </button>
        </div>

        <div v-for="(items, group) in groupedTools" :key="group" class="tool-group">
          <h2>{{ group }}</h2>
          <button
            v-for="tool in items"
            :key="tool.id"
            class="tool-nav-item"
            :class="{ active: tool.id === activeTool.id }"
            type="button"
            @click="selectTool(tool)"
          >
            <span>{{ tool.name }}</span>
            <small>{{ tool.from }} → {{ tool.to }}</small>
          </button>
        </div>
      </aside>

      <section class="tool-workspace">
        <div class="tool-header-card">
          <div>
            <p class="tools-eyebrow">{{ activeTool.group }}</p>
            <h2>{{ activeTool.name }}</h2>
            <p>{{ activeTool.description }}</p>
          </div>
          <div class="tool-actions">
            <button class="favorite-btn" type="button" @click="toggleFavorite">
              {{ isFavorite ? '★ 已收藏' : '☆ 收藏' }}
            </button>
            <div class="tool-badge">{{ activeTool.from }} → {{ activeTool.to }}</div>
          </div>
        </div>

        <div class="editor-grid">
          <div class="editor-panel">
            <div class="editor-toolbar">
              <span>Input · {{ activeTool.from }}</span>
              <button type="button" @click="clearInput">清空</button>
            </div>
            <MonacoEditor
              v-model="input"
              :language="activeTool.inputLanguage"
              :placeholder="activeTool.placeholder"
            />
          </div>
          <div class="editor-panel output-panel">
            <div class="editor-toolbar">
              <span>Output · {{ activeTool.to }}</span>
              <button type="button" @click="copyOutput">{{ copied ? '已复制' : '复制' }}</button>
            </div>
            <MonacoEditor
              :model-value="output"
              :language="activeTool.outputLanguage"
              readonly
            />
          </div>
        </div>
      </section>
    </main>

    <Footer class="personal-footer" />
    <BackToTop />
  </div>
</template>
