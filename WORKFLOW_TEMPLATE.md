# WORKFLOW_TEMPLATE.md

> Template สำหรับสร้าง `WORKFLOW.md` ในโปรเจกต์ของผู้ใช้
>
> **เป้าหมาย:** บันทึก**กระบวนการทำงานจริง**ของผู้ใช้ระบบ (ไม่ใช่ technical/code flow)
> เพื่อให้ทีมงาน + AI agent เข้าใจระบบเร็ว ไม่ต้อง scan codebase ทั้งโปรเจกต์
>
> **ตำแหน่ง:** วางที่ root ของโปรเจกต์ (`<project_root>/WORKFLOW.md`) คู่กับ `README.md`, `CLAUDE.md`
>
> **ผู้ดูแล:** เอฟ (SA) สร้าง/อัปเดต • หมู (QA) ตรวจตอนปิดงานว่า update แล้วถ้า behavior เปลี่ยน

---

## วิธีใช้ Template นี้

1. คัดลอกทุก section ด้านล่างไปเป็น `<project_root>/WORKFLOW.md`
2. กรอกตามจริง — ถ้ายังไม่มีข้อมูล ใส่ `*(รอรายละเอียดเพิ่มเติม)*` ไว้ก่อน
3. ไม่ต้องกรอกครบทุก section ในรอบเดียว — เพิ่มได้เรื่อยๆ ตามที่เรียนรู้
4. ถ้า section ไหนไม่เกี่ยวกับโปรเจกต์ลบทิ้งได้

---

## Template เริ่มต้น

```markdown
# WORKFLOW.md — กระบวนการทำงานจริงของระบบ [ชื่อโปรเจกต์]

> ไฟล์นี้บันทึก **กระบวนการทำงานจริง** ของผู้ใช้งาน (ไม่ใช่ technical/code flow)
> อัปเดตได้เรื่อยๆ ไม่ต้องเรียงลำดับตอนบอก — ทีมจะ sort/reorganize ให้

---

## สถานะ: [Draft / Active / Stable]

| วันที่ | ผู้บันทึก | หมายเหตุ |
|--------|-----------|----------|
| YYYY-MM-DD | [ชื่อ] | เริ่ม draft |

---

## ผู้ใช้งาน / แผนก

| # | แผนก/Role | บทบาทในระบบ | สถานะการรองรับ |
|---|-----------|-------------|:--------------:|
| 1 | [ชื่อ] | [ทำอะไรในระบบ] | ✅ / ⚙️ / ❌ |

---

## ภาพรวมระบบ

ระบบประกอบด้วย [N] ส่วน/module หลัก:

| ส่วน | ชื่อ | จุดประสงค์ | สถานะ |
|------|------|-----------|-------|
| Part 1 | [ชื่อ] | [ทำอะไร] | ⚙️ |

\`\`\`
[ASCII diagram หรือ Mermaid flow แสดงการเชื่อมต่อระดับสูง]
\`\`\`

---

## กระบวนการทำงาน — [ชื่อส่วน/Phase]

> หมายเหตุ: ถ้าระบบมีหลายส่วน ทำหัวข้อนี้ซ้ำสำหรับแต่ละส่วน

### Step 1: [ชื่อขั้นตอน]

- **ผู้ดำเนินการ:** [Role/แผนก]
- **หน้าที่ใช้งาน:** \`path/to/page.ext\` (ถ้ามี — อ้างอิงไฟล์/route จริง)
- **Trigger:** [อะไรทำให้ step นี้เริ่ม]

**Field/Input ที่เกี่ยวข้อง:**

| Section | Field | หมายเหตุ |
|---------|-------|---------|
| [...] | [...] | [...] |

**ขั้นตอน:**
1. [ผู้ใช้ทำอะไร]
2. [ระบบทำอะไร]

**ผลลัพธ์:**
- [State ที่เปลี่ยน]
- [Trigger step ถัดไปอะไร]

**กรณีพิเศษ:**
- กรณี Approve: [...]
- กรณี Reject: [...]
- กรณี Cancel: [...]

---

### Step 2: [ชื่อขั้นตอน]
[เหมือน Step 1]

---

## Roles และสิทธิ์

| Role | แผนก | ทำอะไรได้ | Step ที่เกี่ยวข้อง |
|------|------|-----------|-------------------|
| [Role] | [แผนก] | [...] | Step X, Y |

---

## จุดส่งต่องาน (Handoff Points)

| จาก | ไป | Trigger | สถานะหลัง |
|-----|-----|---------|-----------|
| [Role A] | [Role B] | [event] | [state] |

---

## Gate Flow / Process Diagram

\`\`\`
[ASCII flowchart แสดง flow ทั้งหมดในระดับ overview]
\`\`\`

---

## หมายเหตุ / ข้อยกเว้น / Edge Cases

- [Business rule ที่ไม่ obvious]
- [Permission / Role exception]
- [Auto-behavior ของระบบ ที่ผู้ใช้อาจไม่รู้]

---

## ขั้นตอนที่รับมาแบบไม่เรียง (Inbox)

> ใช้เมื่อ user เล่า workflow มาเป็นชิ้นๆ ไม่เรียงลำดับ — ทีมจะย้ายเข้า Step ที่ถูกต้องภายหลัง

| # | ขั้นตอน | Step ที่น่าจะอยู่ | หมายเหตุ |
|---|---------|------------------|----------|
| — | — | — | — |
```

---

## หลักการสำคัญในการเขียน WORKFLOW.md

1. **เขียนในมุม User ก่อน, Tech ทีหลัง** — ผู้ใช้กดอะไร เห็นอะไร ไม่ใช่ "ระบบ INSERT row ลง table"
2. **อ้างอิงไฟล์/หน้าจอ/route จริง** — เพื่อให้ AI link กลับโค้ดได้ (เช่น `requests/index.php`, `/dashboard`)
3. **Trigger ต้องชัด** — "step ถัดไปเริ่มเมื่อไหร่" สำคัญพอๆ กับ "ทำอะไร"
4. **บันทึก gate / handoff ทุกจุด** — point ที่ส่งงานจากคนหนึ่งไปอีกคน คือจุดที่ bug มักหลุด
5. **Notes/Exceptions = treasure** — business rule แปลกๆ ที่ obvious ไม่ได้ ต้องเขียน
6. **อนุญาตให้ไม่ครบ** — draft ดีกว่าไม่มี อัปเดตทีละนิดได้
7. **Behavior change = ต้อง update** — ทุกครั้งที่ flow/permission/gate เปลี่ยน → update WORKFLOW.md ก่อนปิดงาน

---

## ความสัมพันธ์กับ docs อื่น

| ไฟล์ | บทบาท |
|---|---|
| `WORKFLOW.md` (root) | **กระบวนการทำงานของระบบในมุมผู้ใช้** — Single Source of Truth ของ behavior |
| `CLAUDE.md` (root) | คำสั่งสำหรับ AI — convention, tech stack, do/don't |
| `README.md` (root) | overview สำหรับ developer ใหม่ — install, run, contribute |
| `docs/design.md` | (new_project) Architecture + Data Model + API Contract |
| `docs/data-flow.md` | Mermaid flowchart — data transport (User → API → Logic → DB) |
| `docs/program-flow.md` | Mermaid flowchart — logic/decision flow ของ feature |
| `docs/data-dictionary.md` | Schema — column/type/nullable/description |
| `docs/test-plan.md` | (new_project) Unit/Integration/E2E test cases |
