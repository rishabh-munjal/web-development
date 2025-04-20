Absolutely! Here's a **detailed summary of everything you learned and did** in this chat, with an emphasis on **setting up HTTPS, NGINX config, backend API routing, troubleshooting 401 errors, and general deployment principles**. You’ve basically set up a secure full-stack app on EC2, so here's a full breakdown:

---

## 🧾 **Deployment + HTTPS Configuration Deep Dive: `spendsmart.duckdns.org`**

---

### 🖥️ **1. EC2 Environment & Environment Variables**

- To **check running environment variables**:
  ```bash
  printenv
  ```
- To update or set environment variables in `.env`:
  ```bash
  nano .env
  ```
- Common mistake: values in `.env` should not be quoted unless needed. Example:
  ```env
  MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
  ```

- After changing `.env`, **restart your Node.js app** (especially if using `dotenv`):
  ```bash
  pm2 restart <app-name>
  ```

---

### 🌐 **2. NGINX Setup to Serve Frontend and Proxy Backend**

#### 🔧 Original NGINX config:
- Served frontend from React build
- Used port `80` (HTTP)

#### 🆕 Final NGINX Config with HTTPS and Backend Proxy:

```nginx
server {
    listen 443 ssl;
    server_name spendsmart.duckdns.org;

    root /home/ubuntu/personal-finance-tracker/frontend/build;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    ssl_certificate /etc/letsencrypt/live/spendsmart.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/spendsmart.duckdns.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name spendsmart.duckdns.org;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}
```

✅ Result:
- React frontend is served over `https://spendsmart.duckdns.org`
- API requests go through `https://spendsmart.duckdns.org/api/` and are reverse-proxied to `http://localhost:5000`

---

### 🔐 **3. SSL/HTTPS Setup with Let’s Encrypt (Certbot)**

- Used **DuckDNS** (free domain) and linked it with EC2's public IP
- Installed **Certbot** with:
  ```bash
  sudo snap install --classic certbot
  ```
- Generated and auto-configured SSL certificate:
  ```bash
  sudo certbot --nginx -d spendsmart.duckdns.org
  ```
- This added:
  - Certificate + Key paths
  - `listen 443 ssl` config
  - Redirect from HTTP to HTTPS

---

### 🧱 **4. EC2 Firewall Rules**

- Opened ports:
  - **80** for HTTP
  - **443** for HTTPS
  - **22** for SSH
- Make sure **443 is open in AWS Security Groups** (this was initially blocked)

---

### 🧪 **5. Debugging Backend & Port Listening**

- To check which ports are being used:
  ```bash
  sudo lsof -i -P -n | grep LISTEN
  ```

- Found:
  - Port 5000 (Node backend)
  - Port 80 and 443 (NGINX)
  - Port 22 (SSH)

---

### 📦 **6. Backend Reverse Proxy (With NGINX)**

- API requests to:
  ```
  https://spendsmart.duckdns.org/api/login
  ```
  are proxied internally to:
  ```
  http://localhost:5000/api/login
  ```

> This avoids CORS issues and lets frontend/backend share the same domain, which is great for production!

---

### 🔐 **7. 401 Unauthorized – Axios & Auth Error Debugging**

You encountered:
```js
AxiosError: Request failed with status code 401
```

- Meaning: **backend is running fine**, but **authentication failed**

#### Possible Causes:
- Wrong credentials sent from frontend
- Backend login route rejecting due to:
  - Invalid email/password
  - Missing token (in protected routes)
  - JWT_SECRET not loading (from .env)

#### How to Debug:
- Check frontend request payload (`email`, `password`)
- Ensure login route doesn’t check JWT
- Use `console.log()` in backend route
- Check logs using:
  ```bash
  pm2 logs
  ```

#### Test with curl:
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"test123"}'
```

---

### 📁 **8. Final Folder Structure Overview (on EC2)**

```
/home/ubuntu/
├── personal-finance-tracker/
│   ├── backend/
│   │   ├── .env
│   │   └── index.js
│   ├── frontend/
│   │   └── build/
├── /etc/nginx/sites-available/default
```

---

## 🎯 Key Skills You Learned

| Category | Skills |
|---------|--------|
| **Linux** | Working with SSH, environment variables, file editing (`nano`) |
| **NGINX** | Reverse proxy, serving static React frontend, redirect from HTTP to HTTPS |
| **SSL/HTTPS** | Setting up Let's Encrypt with Certbot, securing domain |
| **EC2 Networking** | Opening ports via AWS Security Group |
| **Backend Debugging** | Finding running ports, checking logs, verifying Axios errors |
| **Deployment Best Practices** | Using `localhost` in NGINX, securing APIs, separating frontend/backend |
| **Domains & DNS** | Using DuckDNS to get free subdomain |
| **Production Hosting** | Hosting full-stack app with Node.js backend, React frontend, and NGINX reverse proxy on HTTPS |

---

Let me know if you want this exported as a PDF, Markdown, or saved in a file! Also, I can help turn this into a blog post or LinkedIn writeup to document your learning if you want.
