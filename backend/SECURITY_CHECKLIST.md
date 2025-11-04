# Security Checklist - Hiện trạng & Cần làm

## ✅ ĐÃ CÓ (OK)

1. **Argon2**: Đã dùng argon2id cho password hashing ✓
2. **Session Cookie**: Đã có httpOnly, secure (env), sameSite, SESSION_SECRET ✓
3. **CSRF Protection**: Đã có csurf với endpoint `/csrf-token` ✓
4. **CORS**: Đã cấu hình với FRONTEND_ORIGIN từ env ✓
5. **Rate Limiting**: Có general limiter và login limiter ✓
6. **Helmet**: Đã có middleware bảo mật ✓

---

## 🔴 BẮT BUỘC - ƯU TIÊN CAO

### 1. Regenerate Session ID (CRITICAL)
**Hiện trạng**: Chưa regenerate session khi login/signup → dễ bị session fixation
**Cần làm**: 
- Thêm `req.session.regenerate()` sau khi login/signup thành công
- File: `authController.js` (login & signup functions)

### 2. Rate Limit cho Signup
**Hiện trạng**: Chỉ có limiter cho `/auth/login`, chưa có cho `/auth/signup`
**Cần làm**:
- Tạo signupLimiter trong `server.js`
- Áp dụng: `app.use("/auth/signup", signupLimiter)`

### 3. Giảm express.json limit
**Hiện trạng**: Đang 10mb → dễ bị DoS
**Cần làm**:
- Đổi `express.json({ limit: "10mb" })` → `express.json({ limit: "1mb" })`
- File: `server.js` line 55

### 4. Login Error Message (Không leak thông tin)
**Hiện trạng**: Đã dùng thông báo chung nhưng cần đảm bảo consistency
**Cần làm**:
- Kiểm tra tất cả login errors đều dùng message giống nhau
- File: `authController.js` (đã OK nhưng cần verify)

---

## 🟡 QUAN TRỌNG - ƯU TIÊN TRUNG BÌNH

### 5. HTTPS Configuration
**Hiện trạng**: Chưa có HTTPS setup, cookie secure dựa trên env
**Cần làm**:
- Production: Setup reverse proxy (nginx) với SSL
- Set `COOKIE_SECURE=1` trong production
- Enable HSTS trong nginx config
- Verify `TRUST_PROXY=1` khi dùng reverse proxy

### 6. Helmet Configuration (Tối ưu)
**Hiện trạng**: Dùng helmet mặc định, chưa tối ưu
**Cần làm**:
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Cấu hình CSP nhẹ cho frontend
    },
  },
  xPoweredBy: false, // Đã có trong helmet mặc định
}));
```

### 7. Input Sanitization
**Hiện trạng**: Chưa có sanitization cho user input
**Cần làm**:
- Thêm express-validator sanitization (đã có validation nhưng chưa sanitize)
- Hoặc dùng `express-validator` `.escape()` cho username, email

---

## 🟢 NÊN CÓ - ƯU TIÊN THẤP

### 8. Email Verification
**Hiện trạng**: Chưa có
**Cần làm**:
- Tạo email verification token trong DB
- Gửi email khi signup
- Endpoint `/auth/verify-email/:token`

### 9. Password Reset
**Hiện trạng**: Chưa có
**Cần làm**:
- Endpoint `/auth/forgot-password`
- Endpoint `/auth/reset-password/:token`
- Token với expiration trong DB

### 10. CAPTCHA
**Hiện trạng**: Chưa có
**Cần làm**:
- Integrate Google reCAPTCHA hoặc hCaptcha
- Validate ở signup/login endpoints

---

## 📋 TÓM TẮT THEO ĐỘ ƯU TIÊN

### 🔥 PHẢI LÀM NGAY: ✅ ĐÃ HOÀN THÀNH
1. ✅ Regenerate session ID (login/signup) - ĐÃ THÊM
2. ✅ Rate limit cho signup - ĐÃ THÊM (3 requests/hour)
3. ✅ Giảm express.json limit về 1mb - ĐÃ THAY ĐỔI
4. ✅ Helmet optimization - ĐÃ CẤU HÌNH CSP

### ⚠️ LÀM SỚM:
1. ✅ Login error message consistency - ĐÃ KIỂM TRA (OK)
2. HTTPS setup (production) - CẦN SETUP KHI DEPLOY
3. Input sanitization - CẦN THÊM

### 💡 NÊN CÓ:
8. Email verification
9. Password reset
10. CAPTCHA

