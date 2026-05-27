# 🔧 Mode: bug_fix

**ใช้เมื่อ:** แก้บั๊กเล็ก scope ชัด ไม่กระทบ feature อื่น (1-2 ไฟล์)

## Artifacts ที่ต้องสร้าง
- Execution Plan (สั้น)
- Acceptance Criteria (1-3 ข้อ)
- (เอฟทำ Impact Check แบบเร็ว — ไม่บังคับเต็มรูปแบบ)

## Execution Plan Template (ให้แตงกวาใช้)

```
📋 Execution Plan — Mode: 🔧 bug_fix

Project: [logical name จาก TEAM_KNOWLEDGE.json หรือชื่อโฟลเดอร์]
Tech Stack: [จาก CLAUDE.md หรือไฟล์ config]
Risk Level: [🟢/🟡/🔴]

⚠️ Knowledge ที่เกี่ยวข้อง: (ถ้ามี)
- [K0XX]: [สรุป do/dont]

ลำดับ:
1. 🔎 เอฟ    — locate bug + Impact Check แบบเร็ว
2. 💻 บอส    — fix
3. 🐷 หมู    — AC verify + runtime test + smoke test
4. 📚 แทน    — (เฉพาะเมื่อมี defect/learning)
```

## หมายเหตุสำหรับเอฟ
- ทำ Impact Check แบบเร็ว: `Grep` หาว่าฟังก์ชันที่จะแก้ถูกเรียกจากไหนบ้าง
- ถ้าพบ caller 3+ ที่ → **แจ้งแตงกวาเปลี่ยน Mode → enhance_existing** (ต้องทำ Impact Map + Regression Set เต็มรูปแบบ)

## หมายเหตุสำหรับหมู
- รัน smoke test: ทดสอบว่า flow หลักที่เกี่ยวข้องกับ bug ยังทำงานได้
- ไม่ต้องทำ Regression Test Matrix เต็มรูปแบบ (Mode นี้ scope แคบพอ)
