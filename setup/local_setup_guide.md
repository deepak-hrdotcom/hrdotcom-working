# Local Environment Setup Guide 🚀

This guide will walk you through completing **Step 1 of the Prerequisites** for setting up your local development environment. 

---

## 📋 Checklist Status

| Prerequisite | Status | Action Required |
| :--- | :--- | :--- |
| **1. IDE Preference** | **Completed** | You are already using **Antigravity IDE**! 🎉 |
| **2. NVM (Node Version Manager)** | **Completed** | Installed successfully! 🎉 |
| **3. Node v22** | **Completed** | Using Node **v22.22.3** 🎉 |
| **4. Docker Desktop** | **Completed** | Installed and running successfully! 🐳 |
| **5. Infisical Account** | **Completed** | Already signed up! |
| **6. SQL dump file** | **Pending** | Request access from Walter/team |
| **7. `.dev-s3.env`** | **Pending** | Request access from Walter/team |

---

## 🛠️ Step-by-Step Instructions

### Part 1: Installing NVM & Node v22

Since you currently have Node **v24.12.0** installed globally, installing **NVM (Node Version Manager)** will allow you to switch to **v22** (as requested by Walter) while keeping your global installations clean.

1. **Download NVM for Windows:**
   - Go to the official repository: [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases).
   - Scroll down to the **Assets** section and download **`nvm-setup.exe`** (or `nvm-setup.zip`).
2. **Install NVM:**
   - Run the installer.
   - > [!IMPORTANT]
     > During the installation, NVM will detect your existing Node.js v24.12.0 installation and ask: **"Do you want NVM to control this version?"**
     > Click **Yes** (or OK) to allow NVM to manage it.
3. **Install & Switch to Node v22:**
   - Open a **new** terminal (or Antigravity terminal) and run the following commands:
     ```powershell
     # Install Node.js version 22
     nvm install 22

     # Tell NVM to use version 22
     nvm use 22
     ```
   - Verify that your active Node version is now 22 by running:
     ```powershell
     node -v
     ```

---

### Part 2: Installing Docker & WSL 2 (For Beginners) 🐳

#### What is Docker?
Think of **Docker** as a super-efficient shipping container system for software. Instead of installing a database (like MySQL or PostgreSQL) directly on your Windows OS (which can cause conflicts, permission issues, or bloat your machine), Docker runs the database in an isolated, lightweight container. It ensures that the exact same database setup runs on your machine as it does on Walter's or in production.

#### What is WSL 2?
Docker Desktop on Windows runs best inside **WSL 2 (Windows Subsystem for Linux)**. This allows Windows to run a lightweight Linux kernel so that Docker containers run at native speed.

#### Step-by-Step Installation:
1. **Download Docker Desktop:**
   - Visit the official page: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
   - Click **"Download for Windows"**.
2. **Install Docker Desktop:**
   - Run the downloaded installer.
   - Ensure the checkbox **"Use WSL 2 instead of Hyper-V (recommended)"** is **checked**.
   - Follow the prompts to finish the installation.
3. **Enable WSL 2 (If prompted):**
   - Since WSL is not currently installed on your computer, Docker Desktop will likely prompt you to install/update WSL 2 during or right after the installation.
   - If it doesn't automatically install, you can open **PowerShell as an Administrator** and run:
     ```powershell
     wsl --install
     ```
   - Restart your computer if Windows prompts you to do so.
4. **Launch Docker Desktop:**
   - Open Docker Desktop from your Start Menu.
   - Accept the terms of service. You don't need to create a Docker Hub account unless you want to; you can skip the sign-in step.
   - Once the Docker icon in the bottom-left corner of the window turns **green** (running), you are all set!

---

### Part 3: Requesting SQL Dump & Environment Files

Since you haven't received the access email for the database dump and environment files, here is a draft email/message you can send to Walter:

> **Subject:** Local Environment Setup - Request for SQL Dump & `.dev-s3.env` (Deepak)
>
> Hi Walter,
>
> I am currently completing Step 1 of the local environment setup. 
>
> I have set up my IDE (Antigravity), installed NVM & Node v22, and configured Docker Desktop. I also have my Infisical account ready.
>
> Could you please share the access links/files for:
> 1. The **SQL dump file**
> 2. The **`.dev-s3.env`** configuration file
>
> Thanks,
> Deepak

---

## 🎯 Next Steps Once You Get the Files

Once Walter sends you the files:
- **SQL dump file**: We will use Docker to spin up a local database container and import this dump into it.
- **`.dev-s3.env`**: We will place it in the correct root folder of your project to connect your local app to S3 (file storage).

Let me know if you run into any issues while installing NVM or Docker Desktop, and we will solve them together! 🚀
