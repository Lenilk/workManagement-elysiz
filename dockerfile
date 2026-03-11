# Stage 1: Build stage
FROM oven/bun:latest AS base
WORKDIR /app

# คัดลอกไฟล์จัดการ dependencies
# COPY package.json bun.lockb ./
COPY package.json  ./
COPY prisma ./prisma/

# ติดตั้ง dependencies (ใช้ --frozen-lockfile เพื่อความแม่นยำของเวอร์ชัน)
RUN bun install --frozen-lockfile

# คัดลอกโค้ดและไฟล์ตั้งค่า
COPY . .

# Generate Prisma Client สำหรับ Bun environment
RUN bunx prisma generate

# Stage 2: Production stage
FROM oven/bun:latest AS release
WORKDIR /app

# คัดลอกเฉพาะสิ่งที่จำเป็นมาจาก build stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/src ./src
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.env ./.env

# ตั้งค่า Production Environment
ENV NODE_ENV=production

# เปิด Port ของ Elysia (ปกติคือ 3000)
EXPOSE 3000

# บังคับรันด้วย --bun flag ตามที่คุณต้องการ
# การใช้ --bun หน้าคำสั่ง run หรือชื่อไฟล์ จะทำให้ Bun ทำงานใน native mode
CMD ["bun", "--bun", "run", "src/index.ts"]