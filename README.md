# 🚀 NFT Destekli Telif Korumalı Blog Sistemi

Bu proje; Node.js, Express ve MongoDB kullanılarak geliştirilmiş, makale yazarlarının içeriklerini blockchain üzerinde NFT olarak tescilleyebildiği hibrit bir blog platformudur.

Admin paneli üzerinden paylaşılan her yazı, **Pinata (IPFS)** ve **Viem.js** entegrasyonu sayesinde telif haklarını korumak adına birer ERC-721 tokenine dönüştürülebilir.

---

## ✨ Özellikler
* **Full CRUD İşlemleri:** Blog yazıları oluşturma, okuma, güncelleme ve silme.

* **JWT Kimlik Doğrulama:** Admin paneli için güvenli Kayıt Ol (Register) ve Giriş Yap (Sign In) sistemleri.

* **Rol Tabanlı Erişim:** Ziyaretçiler sadece yazıları okuyabilirken, Adminler tüm içerik ve NFT süreçlerini yönetebilir.

* **Web3 & NFT Entegrasyonu:**

* * **Meta veri Hashleme:** Blog gövdesi ve başlığı hashlenerek benzersiz bir veri seti oluşturulur.

* * **IPFS Kaydı:** Veriler Pinata aracılığıyla merkeziyetsiz depolama birimine (IPFS) yüklenir.

* * **Blockchain Minting:** Viem.js kullanılarak akıllı kontrat üzerinden NFT oluşturulur.

* **Akıllı Kontrat:** Proje, Sepolia/Mainnet üzerindeki 0x280708E39295b01E3B6F76c29c36654C4c9F00Ad kontrat adresi ile etkileşim kurar.

---

## 🛠️ Kullanılan Teknolojiler
- [x] Backend: Node.js, Express.js

- [x] Veritabanı: MongoDB (Mongoose)

- [x] Güvenlik: JSON Web Token (JWT), BCrypt

- [x] Web3: Viem.js, Pinata IPFS SDK

- [x] Frontend: EJS (Template Engine), CSS3

---

---

## 🚀 NFT Mint Süreci Nasıl Çalışır?
- 1- **Hazırlık:** Admin panelinde bir post oluşturulur. Status varsayılan olarak none gelir.

- 2- **IPFS Yükleme (Mint NFT Butonu):** Post içeriği hashlenir ve Pinata'ya yüklenir. Status pending olur.

- 3- **Mintleme (NFT Created Butonu):** Viem.js devreye girer, kullanıcıdan cüzdan onayı alınır ve akıllı kontrata mint işlemi gönderilir.

- 4- **Doğrulama:** İşlem başarıyla tamamlandığında buton bir "Transaction Hash" linkine dönüşür. Bu linke tıklayarak blokzinciri ağındaki tescilinizi görebilirsiniz.

---

## ⚙️ Kurulum

- **1-Depoyu klonlayın:**
  
--- 
git clone
---

- **2-Gerekli paketleri yükleyin:**
  
---
npm install
---

- **3- .env dosyasını oluşturun ve bilgileri doldurun:**
  
---
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PINATA_API_KEY=your_key
PINATA_SECRET_API_KEY=your_secret
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=0x280708E39295b01E3B6F76c29c36654C4c9F00Ad
---

- **4-Uygulamayı başlatın:**
  
---
npm start
---

