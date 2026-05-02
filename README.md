# 🚀 NFT Destekli Telif Korumalı Blog Sistemi

Bu proje; Node.js, Express ve MongoDB kullanılarak geliştirilmiş, makale yazarlarının içeriklerini blockchain üzerinde NFT olarak tescilleyebildiği hibrit bir blog platformudur.

Admin paneli üzerinden paylaşılan her yazı, **Pinata (IPFS)** ve **Viem.js** entegrasyonu sayesinde telif haklarını korumak adına birer ERC-721 tokenine dönüştürülebilir.

---

## ✨ Özellikler
* **Full CRUD İşlemleri:** Blog yazıları oluşturma, okuma, güncelleme ve silme.

* **JWT Kimlik Doğrulama:** Admin paneli için güvenli Kayıt Ol (Register) ve Giriş Yap (Sign In) sistemleri.

* **Rol Tabanlı Erişim:** Ziyaretçiler sadece yazıları okuyabilirken, Adminler tüm içerik ve NFT süreçlerini yönetebilir.

* **Web3 & NFT Entegrasyonu:**

  * **Meta veri Hashleme:** Blog gövdesi ve başlığı hashlenerek benzersiz bir veri seti oluşturulur.

  * **IPFS Kaydı:** Veriler Pinata aracılığıyla merkeziyetsiz depolama birimine (IPFS) yüklenir.

  * **Blockchain Minting:** Viem.js kullanılarak akıllı kontrat üzerinden NFT oluşturulur.

* **Akıllı Kontrat:** Proje, Sepolia/Mainnet üzerindeki 0x280708E39295b01E3B6F76c29c36654C4c9F00Ad kontrat adresi ile etkileşim kurar.

---

## 🛠️ Kullanılan Teknolojiler
- [x] Backend: Node.js, Express.js

- [x] Veritabanı: MongoDB (Mongoose)

- [x] Güvenlik: JSON Web Token (JWT), BCrypt

- [x] Web3: Viem.js, Pinata IPFS SDK

- [x] Frontend: EJS (Template Engine), CSS3

---
<img width="917" height="292" alt="blog register" src="https://github.com/user-attachments/assets/d73c7931-3c5b-4f67-8f8b-d127303ae524" />
<img width="748" height="268" alt="blog sign" src="https://github.com/user-attachments/assets/44852e38-1d98-4e7c-b5d9-791a30d855e5" />
<img width="698" height="827" alt="blog2" src="https://github.com/user-attachments/assets/0e8a2b5f-46aa-47a4-bcbd-c3c1693b8278" />
<img width="1024" height="442" alt="BLOGPOST" src="https://github.com/user-attachments/assets/a3eda2a1-edc4-4d59-9aa8-631b0d96a564" />
<img width="1267" height="713" alt="blog" src="https://github.com/user-attachments/assets/896899e3-ba7a-4c13-8fd3-a845b5fdb238" />


---

## 🚀 NFT Mint Süreci Nasıl Çalışır?
- 1- **Hazırlık:** Admin panelinde bir post oluşturulur. Status varsayılan olarak none gelir.

- 2- **IPFS Yükleme (Mint NFT Butonu):** Post içeriği hashlenir ve Pinata'ya yüklenir. Status pending olur.

- 3- **Mintleme (NFT Created Butonu):** Viem.js devreye girer, kullanıcıdan cüzdan onayı alınır ve akıllı kontrata mint işlemi gönderilir.

- 4- **Doğrulama:** İşlem başarıyla tamamlandığında buton bir "Transaction Hash" linkine dönüşür. Bu linke tıklayarak blokzinciri ağındaki tescilinizi görebilirsiniz.

---

## ⚙️ Kurulum

- **1-Depoyu klonlayın:**
'''
git clone
'''
- **2-Gerekli paketleri yükleyin:**
'''
npm install
'''
- **3- .env dosyasını oluşturun ve bilgileri doldurun:**


'''
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PINATA_API_KEY=your_key
PINATA_SECRET_API_KEY=your_secret
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=0x280708E39295b01E3B6F76c29c36654C4c9F00Ad
'''

- **4-Uygulamayı başlatın:**
'''
npm start
'''

