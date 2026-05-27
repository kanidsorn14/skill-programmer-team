# 🆕 Mode: new_project

**ใช้เมื่อ:** สร้างโปรเจกต์ใหม่จาก 0

## หลักการสำคัญ — Design First

โปรเจกต์ใหม่ที่ไม่มี requirement doc + design doc = หนี้เทคนิควันแรก
- ห้ามให้บอสเริ่ม code ก่อน Requirement + Design ผ่าน review
- ห้าม commit ก่อน Test Plan ถูกเขียน
- ทุก phase ต้องให้ผู้ใช้ approve ก่อนข้าม (ยกเว้นผู้ใช้สั่ง autopilot)

## Artifacts ที่ต้องสร้าง (ก่อนเข้า code)

1. **Requirement Doc** (แตงกวา) → `<project_root>/docs/requirement.md`
2. **Wireframe/User Flow** (น้ำชา ถ้ามี UI) → `<project_root>/docs/wireframe.md`
3. **Design Doc** (เอฟ) → `<project_root>/docs/design.md`
4. **Test Plan** (หมู) → `<project_root>/docs/test-plan.md`

## Execution Plan Template (แตงกวา)

```
📋 Execution Plan — Mode: 🆕 new_project

Project: [logical name ใหม่ — แทนจะลงทะเบียนหลังปิดงาน]
Tech Stack: [จากผู้ใช้]
Project Structure: [เสนอโครงสร้างไฟล์]
Risk Level: [🟢/🟡/🔴]

Phase 1 — Requirement (แตงกวา):
1.1 เขียน docs/requirement.md
1.2 ส่งผู้ใช้ review → wait approval

Phase 2 — Design:
2.1 [optional] 🍵 น้ำชา — Wireframe + User Flow → docs/wireframe.md
2.2 🔎 เอฟ — Design Doc → docs/design.md
2.3 [optional] 🍬 น้ำหวาน — DB Schema → ผนวกใน design.md
2.4 [optional] 🔧 ท๊อป — review architectural decisions
2.5 ส่งผู้ใช้ review → wait approval

Phase 3 — Test Planning:
3.1 🐷 หมู — docs/test-plan.md (unit/integration/e2e + coverage target)

Phase 4 — Build:
4.1 💻 บอส (+ optional ปอนด์) — implement ตาม design
4.2 🐷 หมู — AC verify + run Test Plan + Runtime

Phase 5 — Close:
5.1 📚 แทน — register new project name + บันทึก learning
```

## Templates

### 1. Requirement Doc (แตงกวาเขียน Phase 1)

```markdown
# Requirement Doc — [ชื่อโปรเจกต์]

## 1. Goal & Why
[ผู้ใช้ต้องการอะไร และทำไม]

## 2. Stakeholders / Users
- [ใครจะใช้ระบบนี้]
- Persona หลัก: [...]

## 3. User Stories
- US-1: As a [user], I want [action] so that [benefit]
- US-2: ...

## 4. Success Metrics
- [วัดผลสำเร็จด้วยอะไร เช่น user login ได้ภายใน 2 วินาที / data accuracy 100%]

## 5. Out of Scope (ตัดออกจาก v1)
- [ฟีเจอร์ที่ตัดออกชัดเจน]

## 6. Constraints
- Tech Stack: [...]
- Deploy target: [...]
- Data sensitivity: [...]
```

### 2. Design Doc (เอฟเขียน Phase 2.2)

```markdown
# Design Doc — [ชื่อโปรเจกต์]

## 1. Architecture Overview
[Diagram: frontend / backend / DB / external services]

## 2. File Structure
project_root/
├── src/
│   ├── ...
├── tests/
├── docs/
└── ...

## 3. Data Model
### Entity: [ชื่อ]
- field1: type — description
- relationships: [...]

## 4. API Contract (ถ้ามี backend)
### POST /api/[endpoint]
Request: { ... }
Response: { ... }
Errors: [...]

## 5. Key Modules / Functions
- `module_a.fn_x(args)` — purpose

## 6. External Dependencies
- [library]: [purpose] — version

## 7. Decision Log
- เลือก X แทน Y เพราะ [...]
```

### 3. Test Plan (หมูเขียน Phase 3.1)

```markdown
# Test Plan — [ชื่อโปรเจกต์]

## 1. Scope & Strategy
- Test pyramid: Unit / Integration / E2E
- Coverage target: [Unit 70% / Integration cover ทุก API / E2E cover golden path]
- Test framework: [Jest / PyTest / PHPUnit / etc.]

## 2. Test Cases — Unit
### Module: [ชื่อ]
- UT-1: [function X] with valid input → expected Y
- UT-2: edge case Z → expected error

## 3. Test Cases — Integration
- IT-1: API POST /endpoint valid body → 200 + correct data
- IT-2: DB transaction rollback on error

## 4. Test Cases — E2E (Golden Path)
- E2E-1: User signs up → logs in → performs action → sees result

## 5. AC Mapping
| AC | Test Cases |
|----|------------|
| AC-1 | UT-3, IT-2, E2E-1 |

## 6. Non-functional (ถ้าจำเป็น)
- Performance: [response time < X ms ที่ Y RPS]
- Security: [auth bypass, XSS, SQL injection]

## 7. Test Data & Fixtures
- [ระบุ test data ที่ต้องเตรียม]
```

## หมายเหตุสำหรับน้ำชา (Phase 2.1)
ก่อน aesthetic plan ต้องสร้าง Wireframe + User Flow ก่อน:
```markdown
# Wireframe — [ชื่อโปรเจกต์]

## User Flow
[Mermaid flowchart หรือ ASCII art]

## Screens
### Screen 1: [ชื่อ]
[ASCII wireframe หรือคำอธิบาย layout]
- Elements: [...]
- Actions: [...]
- Transitions: [→ Screen 2 เมื่อ ...]
```

## หมายเหตุสำหรับบอส (Phase 4.1)
- อ่าน Design Doc ก่อนเริ่ม code
- ทำ Read-Back ระบุ "จะสร้างไฟล์ไหนตาม structure ใน Design"
- Pre-flight ตรวจว่า file structure ตรงตาม Design

## หมายเหตุสำหรับหมู (Phase 4.2)
- รัน Test Plan ทั้งหมดที่เขียนไว้ใน Phase 3
- รายงาน:
```
📊 Test Execution Report
Unit Tests:        X/Y passed
Integration Tests: X/Y passed
E2E Tests:         X/Y passed
Coverage:          XX%
Failed Cases: [list]
```
- Coverage ไม่ถึง target → reject

## หมายเหตุสำหรับแทน (Phase 5.1)
- ลงทะเบียน project ใหม่ใน TEAM_KNOWLEDGE.json (ใช้ Logical Name)
- บันทึกเฉพาะ learning จริง (architectural decision, gotcha ใน stack ใหม่)
- ไม่บันทึก trivial setup ทั่วไป
