# 🔨 Mode: enhance_existing

**ใช้เมื่อ:** เพิ่ม/แก้ feature ในโปรเจกต์เดิม (กระทบหลายไฟล์ / logic หลัก / multiple callers)

## หลักการสำคัญ — Existing Code = Sacred

โค้ดที่ทำงานอยู่ในระบบเดิม = สัญญากับ user ที่ใช้งานอยู่แล้ว
- ห้ามแก้ไขสิ่งที่ไม่ได้อยู่ใน scope แม้จะ "เห็นว่าควรแก้"
- ทุกการแก้ ต้องพิสูจน์ว่า feature เดิมยังทำงานได้ (Regression Test)

## Prerequisite: WORKFLOW.md

ก่อนเริ่มงาน Mode นี้ — ต้องมี `<project_root>/WORKFLOW.md` ที่อัปเดตล่าสุด
- มีอยู่ → ทีมทุกคน `Read` ก่อนวางแผน เพื่อรู้ว่า feature ที่จะแก้อยู่ Step/Phase ไหน
- ไม่มี → แตงกวาต้องหยุด ถามผู้ใช้สร้าง draft ก่อน (เอฟทำ — ดู f_sa.md ส่วน "WORKFLOW.md Management")
- ผู้ใช้ skip → ทำงานต่อแต่ flag risk ใน Execution Plan

หลังจบงาน — ถ้า flow / gate / permission / role เปลี่ยน → เอฟต้อง `Edit` `WORKFLOW.md` ก่อนปิดงาน

## Artifacts ที่ต้องสร้าง
- Execution Plan
- Acceptance Criteria (AC ใหม่ + AC Regression)
- **Impact Map** (เอฟสร้าง)
- **Regression Set** (เอฟสร้าง)
- Test Matrix (หมูใช้รัน)

## Execution Plan Template (แตงกวา)

```
📋 Execution Plan — Mode: 🔨 enhance_existing

Project: [logical name]
Tech Stack: [จาก CLAUDE.md หรือไฟล์ config]
Risk Level: [🟢/🟡/🔴]

⚠️ Knowledge ที่เกี่ยวข้อง: (ถ้ามี)
- [K0XX]: [สรุป do/dont]
⚠️ User-rejected defects ที่ต้องระวัง: (ถ้ามี)
- [K0XX]: [defect pattern]

ลำดับ:
1. [optional] 🍵 น้ำชา  — UI Plan (ถ้าแตะ UI)
2. 🔎 เอฟ    — scope + Impact Map + Regression Set
   (เรียกน้ำหวานถ้า DB; activate ท๊อปถ้า pre-approved)
3. [optional] 🍬 น้ำหวาน — DB Plan
4. [optional] 🔧 ท๊อป   — technical approach
5. 💻 บอส    — implement (Read-Back + Pre-flight)
6. 🐷 หมู    — AC verify + Regression Test + Runtime
   (เรียกอาท/เอิ้กถ้าต้องการ)
7. 📚 แทน    — (เฉพาะเมื่อมี defect/learning)
```

## AC Template (2 ประเภท)

```
✅ Acceptance Criteria (New)
AC-N1: Given [...] When [...] Then [...] (Verify by: ...)
AC-N2: ...

✅ Regression Criteria (Existing — ต้องไม่พัง)
AC-R1: Given [feature เดิม X] When [trigger เดิม] Then [ผลลัพธ์เดิม] (Verify by: ...)
AC-R2: ...
```

## หมายเหตุสำหรับเอฟ

### Impact Map (บังคับ)
แผนที่บอกว่า "ฟังก์ชันที่จะแก้ ถูกเรียกจากที่ไหนบ้าง"

วิธีทำ:
1. แต่ละฟังก์ชัน/ไฟล์ที่จะแก้ → `Grep` ค้นชื่อในทั้งโปรเจกต์
2. ระบุ caller ทั้งหมด + สถานการณ์
3. caller 3+ ที่ → แนะนำ activate ท๊อป

```
🗺️ Impact Map

[ฟังก์ชัน A] (file.php:42)
├── เรียกจาก [file_x.php:10] — flow [...]
├── เรียกจาก [file_y.php:55] — flow [...]
└── เรียกจาก [file_z.js:23] — flow [...]
```

### Regression Set (บังคับ)
รายการ feature เดิมที่ต้อง test ว่ายังทำงานได้

วิธีทำ:
1. ดูจาก Impact Map → caller ทุกตัว = feature เดิมที่ต้อง verify
2. เพิ่ม flow ที่ user ใช้บ่อยที่ผ่านโค้ดที่จะแก้
3. ระบุวิธี test แต่ละ feature

```
🛡️ Regression Set

R-1: [Feature เดิม] — ใช้ฟังก์ชันที่แก้ที่ [file:line]
     Test: curl POST /api/x / open หน้า /page-y / รัน test runner

R-2: ...
```

## หมายเหตุสำหรับบอส
- Read-Back ต้องระบุ "สิ่งที่จะ**ไม่**แตะ" ชัดเจน — caller ของ Impact Map ห้ามแก้ interface
- Pre-flight: ตรวจว่า caller ใน Impact Map ยังทำงานได้

## หมายเหตุสำหรับหมู

### Regression Test Matrix (บังคับ)
```
🛡️ Regression Test Matrix

| ID | Feature เดิม | Verify Method | Result | Evidence |
|----|---|---|---|---|
| R-1 | [feature] | curl / Grep / UI | ✅/❌ | [output จริง] |
| R-2 | ... | ... | ... | ... |
```

**กฎเหล็ก:** ถ้า R-X ❌ Fail → **Reject ทันที** — feature เดิมพัง = ห้ามผ่าน

Runtime Verification ต้องครอบคลุมทั้ง AC ใหม่ **และ** Regression Set ทั้งหมด
