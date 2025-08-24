# 🌐 Space Conquest Game - Jetzt Online Spielen!

## 🎮 **Sofort Spielen (Ein-Klick-Deployment)**

### **Option 1: Vercel + Neon (Empfohlen) - 100% Kostenlos**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Trend4Media/ProjectUniverse&env=DATABASE_URL,JWT_SECRET&envDescription=Database%20and%20JWT%20configuration&envLink=https://github.com/Trend4Media/ProjectUniverse/blob/main/DEPLOYMENT.md)

**Schritt-für-Schritt:**
1. **Klicken Sie auf "Deploy with Vercel"** ☝️
2. **GitHub Account verbinden** (falls noch nicht geschehen)
3. **Projekt importieren** - Vercel erstellt automatisch eine Kopie
4. **Umgebungsvariablen setzen:**
   - `DATABASE_URL`: Erstellen Sie eine kostenlose Datenbank bei [Neon](https://console.neon.tech/)
   - `JWT_SECRET`: Verwenden Sie einen zufälligen 32-Zeichen String
5. **Deploy klicken** - Fertig in 2-3 Minuten!

**✅ Ihr Spiel ist dann verfügbar unter:** `https://project-universe-[zufällige-id].vercel.app`

---

### **Option 2: Railway (All-in-One) - Einfachster Weg**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/HI3r3k?referralCode=alphasec)

**Was passiert automatisch:**
- ✅ **Datenbank** wird automatisch erstellt (PostgreSQL)
- ✅ **Umgebungsvariablen** werden automatisch gesetzt
- ✅ **SSL-Zertifikat** wird automatisch konfiguriert
- ✅ **Custom Domain** möglich (optional)

**Kosten:** $5/Monat nach dem kostenlosen Kontingent

---

### **Option 3: Render (Kostenlos mit Einschränkungen)**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Trend4Media/ProjectUniverse)

**Besonderheiten:**
- ✅ Komplett kostenlos
- ⚠️ Schläft nach 15 Min Inaktivität ein
- ⚠️ Langsamer Cold-Start (30 Sekunden)

---

## 🚀 **Schnell-Setup (Für Entwickler)**

Falls Sie es selbst deployen möchten:

```bash
# Repository klonen
git clone https://github.com/Trend4Media/ProjectUniverse.git
cd ProjectUniverse

# Dependencies installieren
npm install

# Automatisches Deployment
npm run deploy

# Datenbank einrichten
npm run setup-db
```

---

## 🎮 **Was Sie im Spiel erwartet:**

### **🌟 Sofort verfügbare Features:**
- **👤 Benutzer-Registrierung** - Erstellen Sie Ihr Imperium
- **🧬 5 Einzigartige Rassen:**
  - 👨‍🚀 **Humans** - Forschungsbonus (+20%)
  - 🌪️ **Zephyrians** - Kampfbonus (+15%)
  - 💎 **Crystalline** - Technologiebonus (+25%)
  - 🤖 **Mechanoids** - Industriebonus (+20%)
  - 🌌 **Void Born** - Kriegsführungsbonus (+30%)

- **🌌 Riesiges Universum:**
  - 500+ prozedural generierte Planeten
  - 7 verschiedene Planetentypen
  - Piratenstützpunkte und Geheimnisse

- **💰 Komplexe Wirtschaft:**
  - 8 verschiedene Ressourcen
  - Dynamisches Handelssystem
  - Politische Entscheidungen

- **📱 Perfekt für Mobile:**
  - Responsive Design
  - Touch-optimiert
  - Funktioniert auf allen Geräten

### **🚧 In Entwicklung (Erweiterbar):**
- Kolonien gründen und verwalten
- Flotten bauen und kämpfen
- Forschungsbaum freischalten
- Allianzen bilden
- Planeten erobern

---

## 🔧 **Technische Details**

**Frontend:** Next.js 14 + React + TypeScript + Tailwind CSS
**Backend:** Node.js API Routes + JWT Authentication
**Datenbank:** PostgreSQL + Prisma ORM
**Hosting:** Vercel/Railway/Render
**Performance:** Server-Side Rendering + CDN

---

## 🆘 **Hilfe & Support**

### **Häufige Probleme:**

**❓ "Database connection failed"**
- Überprüfen Sie die DATABASE_URL in den Umgebungsvariablen
- Stellen Sie sicher, dass die Datenbank erreichbar ist

**❓ "JWT_SECRET missing"**
- Fügen Sie eine JWT_SECRET Umgebungsvariable hinzu
- Mindestens 32 Zeichen lang

**❓ "Page not loading"**
- Warten Sie 30 Sekunden (Cold Start bei kostenlosen Services)
- Aktualisieren Sie die Seite

### **Support-Kanäle:**
- 📧 **GitHub Issues:** [Erstellen Sie ein Issue](https://github.com/Trend4Media/ProjectUniverse/issues)
- 📖 **Dokumentation:** [Vollständige Anleitung](https://github.com/Trend4Media/ProjectUniverse/blob/main/README.md)
- 🛠️ **Deployment Guide:** [Technische Details](https://github.com/Trend4Media/ProjectUniverse/blob/main/DEPLOYMENT.md)

---

## 🌟 **Demo Screenshots**

### 🏠 Startseite
- Elegante Weltraum-Atmosphäre
- Einfache Registrierung
- Sofortiger Spieleinstieg

### 🧬 Rassen-Auswahl
- Detaillierte Rassenbeschreibungen
- Einzigartige Boni und Fähigkeiten
- Strategische Entscheidungen

### 🌌 Universum-Explorer
- Interaktive Planetenkarte
- Such- und Filterfunktionen
- Detaillierte Planeteninfos

### 📊 Game Dashboard
- Imperium-Statistiken
- Ressourcen-Übersicht
- Fortschritts-Tracking

---

## 🎯 **Bereit zum Spielen?**

**Wählen Sie Ihre bevorzugte Deployment-Option oben und starten Sie in 2 Minuten!** 🚀

**🌌 Erobern Sie das Universum - Direkt in Ihrem Browser! 🌌**

---

*Entwickelt mit ❤️ für Space-Strategy Fans*