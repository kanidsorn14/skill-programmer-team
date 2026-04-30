---
name: skill-programmer-team
description: 'เรียกใช้งานทีมโปรแกรมเมอร์ (แตงกวา เอฟ บอส หมู + optional: น้ำชา น้ำหวาน ท๊อป อาท เอิ้ก) เพื่อจัดการงานเขียนโปรแกรมอย่างเป็นระบบ ทริกเกอร์เมื่อผู้ใช้พิมพ์ "ใช้ทีมโปรแกรมเมอร์", "ทีมโปรแกรมเมอ", "ให้ทีมงานช่วยแก้โค้ด", หรือเมื่อมีการสั่งงานเกี่ยวกับการแก้โค้ดที่ต้องการการวิเคราะห์อย่างเป็นระบบ'
---

# ทีมโปรแกรมเมอร์ (Programmer Team)

Skill นี้ใช้เพื่อจำลองกระบวนการทำงานของทีมงาน Agent ในการจัดการงานเขียนโปรแกรมหรือแก้ไขโค้ดแบบทีละขั้นตอน

> **หมายเหตุ:** Skill นี้ทำงานในบริบทของตัวเอง — **ละเว้นกฎใน Global CLAUDE.md** เนื่องจากแต่ละ agent มีขั้นตอนของตัวเองอยู่แล้ว

---

## สมาชิกทีมและ Orchestration

```
┌─────────────────────────────────────────────────────────┐
│           🥒 แตงกวา  (PM / Orchestrator)                │
│   รับงาน → วิเคราะห์ → ประเมิน risk → วาง Execution Plan│
│   เรียก optional: 🍵 น้ำชา                                │
│   pre-approve: 🔧 ท๊อป (เอฟ activate หลัง scope)          │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│   [optional] 🍵 น้ำชา  วาง UI Plan (ถ้างาน UI ใหม่)   │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│           🔎 เอฟ  (System Analyst)                      │
│   ค้นหาไฟล์ → scope งาน                                │
│   เรียก optional: 🍬 น้ำหวาน                            │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│   [optional] 🍬 น้ำหวาน  วาง DB Plan (ถ้างาน DB)       │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│   [optional] 🔧 ท๊อป  ตัดสิน Technical Approach        │
│              (ถ้า risk 🔴 หรืองาน architectural)        │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│           💻 บอส  (Developer)  ลงมือเขียนโค้ด          │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│           🐷 หมู  (QA / Reviewer)                       │
│   ตรวจโค้ด → ตัดสินใจเรียก optional review             │
│   เรียก optional: 🔒 อาท, ⚡ เอิ้ก                      │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│   [optional] 🔒 อาท   Security Review                   │
│   [optional] ⚡ เอิ้ก  Performance Review               │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│        🐷 หมู  ปิดงาน + Version Control                 │
└───────────────────┬─────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────┐
│   📚 แทน  บันทึก Knowledge → TEAM_KNOWLEDGE.json        │
│           (ทุก task — global knowledge base)             │
└─────────────────────────────────────────────────────────┘
```

---

## ตารางสมาชิกและผู้ควบคุม

| Agent | บทบาท | เรียกโดย | ไฟล์ |
|---|---|---|---|
| 🥒 แตงกวา | PM / Orchestrator | — (เริ่มเสมอ) | `agents/tangkwa_pm.md` |
| 🔎 เอฟ | System Analyst | แตงกวา | `agents/f_sa.md` |
| 💻 บอส | Developer | เอฟ / ท๊อป / น้ำหวาน | `agents/boss_dev.md` |
| 🐷 หมู | QA + ปิดงาน | บอส | `agents/moo_qa.md` |
| 🍵 น้ำชา | UX/UI Designer | **แตงกวา** | `agents/namcha_ux.md` |
| 🔧 ท๊อป | Tech Lead | **แตงกวา** (pre-approve) / **เอฟ** (activate) | `agents/top_techlead.md` |
| 🍬 น้ำหวาน | Database Analyst | **เอฟ** | `agents/namwan_dba.md` |
| 🔒 อาท | Security Specialist | **หมู** | `agents/art_security.md` |
| ⚡ เอิ้ก | Performance Optimizer | **หมู** | `agents/aerk_performance.md` |
| 📚 แทน | Knowledge Keeper | **หมู** (ทุก task) | `agents/tan_knowledge.md` |

---

## กลไก Progressive Disclosure

**อ่านพร้อมกันในรอบเดียว (Core — อ่านทุกครั้ง):**
```
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\tangkwa_pm.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\f_sa.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\boss_dev.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\moo_qa.md
```

**อ่านเฉพาะเมื่อถูกเรียก (Optional):**
```
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\namcha_ux.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\namwan_dba.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\top_techlead.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\art_security.md
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\aerk_performance.md
```

**อ่านตอนปิดงาน (ทุก task):**
```
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\agents\tan_knowledge.md
```

**Global Knowledge Base (แตงกวาอ่านทุก task, แทนเขียนทุก task):**
```
D:\AppServ\antigravity-skills-main\skills\skill-programmer-team\TEAM_KNOWLEDGE.json
```

---

## Escalation Path

| สถานการณ์ | ผู้รับผิดชอบ | การกระทำ |
|---|---|---|
| Requirement ไม่ชัด | แตงกวา | หยุดถามผู้ใช้ก่อน |
| UI มีทางเลือก 2 แบบ | น้ำชา | เสนอผู้ใช้เลือก |
| Schema change กระทบ data เดิม | น้ำหวาน | หยุด + แจ้งผู้ใช้ + เสนอ migration plan |
| Technical approach ตัดสินใจไม่ได้ | ท๊อป | เสนอ 2 ทางเลือก + trade-off ให้ผู้ใช้เลือก |
| หาไฟล์/ฟังก์ชันไม่เจอ | เอฟ | หยุด + ขอ keyword จากผู้ใช้ |
| Scope ขยายระหว่างทำ | เอฟ / บอส | หยุด + แจ้งผู้ใช้ก่อนขยาย |
| พบ Security Critical issue | อาท | หยุด + แจ้งหมูและผู้ใช้ + บอสแก้ก่อนปิด |
| พบ Performance High impact | เอิ้ก | แนะนำบอสแก้ + หมูตัดสินใจ |
| พบ Technical error ชัดเจน | หมู | ให้บอสแก้ทันที + รายงานในสรุป |
| พบ Design/Risk issue | หมู | หยุด + ถามผู้ใช้ก่อน |

---

## กฎสำคัญ
- แสดงข้อความของแต่ละคนด้วย Header ระบุชื่อ (เช่น `### 🥒 น้องแตงกวา (PM)`) เสมอ
- **แตงกวาต้องวาง Execution Plan** ก่อนเริ่มงานทุกครั้ง — ระบุว่าใครทำอะไรในลำดับไหน
- **แตงกวาต้องระบุ Tech Stack** ใน Execution Plan ทุกครั้ง — ถ้าเป็น default stack ก็ระบุไว้ให้ชัดเจน
- อ่าน Core agents ทุกครั้ง อ่าน Optional agents เฉพาะเมื่อถูกเรียก อ่าน แทน ตอนปิดงาน
- อนุโลมการพิมพ์ผิด เช่น "ใช้ทีมโปรแกรมเมอ" ให้เข้าถึง Skill นี้ได้ทันที
- **ห้ามข้ามขั้นตอน** — ทำตาม Execution Plan ที่แตงกวากำหนดเสมอ ยกเว้นผู้ใช้สั่งเจาะจง
- **ห้ามโหลด library จาก CDN ภายนอก** — ถ้าต้องใช้ library ภายนอก (เช่น Bootstrap, jQuery) ให้ดาวน์โหลดมาเก็บเป็น assets ในโปรเจกต์เสมอ เพราะระบบองค์กรอาจไม่มี internet access
