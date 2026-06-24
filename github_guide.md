# Quick Guide: Uploading your AI/ML Portfolio to GitHub (Browser Method)

This guide shows you how to upload your new AI/ML Portfolio to GitHub and make it live on the internet, **entirely through your web browser**—no terminal commands required!

---

### Step 1: Log in to GitHub
1. Go to [github.com](https://github.com) and log into your account.

---

### Step 2: Create a New Repository (Project Folder)
1. In the top-right corner of the page, click the **`+`** icon and select **New repository**.
2. **Repository name**: Type **`ai-ml-portfolio`** (keep it exactly like this, lowercase).
3. **Public/Private**: Make sure it is set to **Public** (so recruiters can see it!).
4. **Initialize this repository**: Do **NOT** check any boxes (like "Add a README file", "Add .gitignore", or "Choose a license"). Leave them blank.
5. Click the green **Create repository** button at the bottom.

---

### Step 3: Open the Upload Interface
Once the repository is created, you will see a setup screen.
1. Look for the sentence: *"Get started by creating a new file or **uploading an existing file**."*
2. Click the clickable link **`uploading an existing file`**.

---

### Step 4: Drag and Drop Your Files
Now you need to upload the files that have been created on your Mac:
1. Open **Finder** on your Mac.
2. Press `Cmd + Shift + G` to open the "Go to Folder" window.
3. Copy and paste this exact path and press Enter:
   `/Users/suryagarneni/.gemini/antigravity/scratch/ai-ml-portfolio`
4. Select these **3 files**:
   - `index.html`
   - `styles.css`
   - `app.js`
5. Drag and drop these 3 files directly into the dashed box on the GitHub page in your browser.
6. Once the files finish loading, scroll down to the bottom and click the green **Commit changes** button.

---

### Step 5: Enable GitHub Pages (To Go Live!)
To make the website accessible to recruiters:
1. On your new repository page, click the **Settings** tab (it has a gear icon next to it in the top menu).
2. On the left sidebar, scroll down to the **Code and automation** section and click **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch** (this is usually selected by default).
   - **Branch**: Click the dropdown that says `None`, change it to **`main`**, and leave the next dropdown as `/ (root)`.
   - Click the **Save** button.

---

### Step 6: Get Your Live Link!
1. Wait about **1 minute** for GitHub to compile your page.
2. Refresh the **Pages** settings page.
3. You will see a box at the top saying: 
   > **Your site is live at** `https://<your-username>.github.io/ai-ml-portfolio/`
4. Click that link to open your portfolio!

---

### Step 7: Update Your Resume & LinkedIn
1. **GitHub Link on Resume**: Add the URL of your repository:
   `https://github.com/<your-username>/ai-ml-portfolio`
2. **Live Demo Link**: In your resume's Projects section (or under your summary/header), you can write:
   *Live Interactive Demo: https://<your-username>.github.io/ai-ml-portfolio/*
3. **Link to Repository inside the Portfolio**: Open the `index.html` file on GitHub, find the placeholder `#` in `<a href="#" target="_blank" class="social-icon" id="github-link">` and you can edit it to point to your github profile page.
