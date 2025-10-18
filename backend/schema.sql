CREATE TABLE devices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    post_status ENUM('publish', 'pending') DEFAULT 'pending',
    post_publish_date VARCHAR(255),
    transaction_type ENUM('sale', 'rent', 'exchange') DEFAULT 'sale',
    price DECIMAL(10,2),
    image_url TEXT,
    tags TEXT,
    location_device TEXT,
    warranty ENUM('yes', 'no', 'included_in_price') DEFAULT 'no',
    shipping ENUM('yes', 'no', 'contact_for_shipping') DEFAULT 'contact_for_shipping',
    seller_role ENUM('manufacturer', 'owner', 'agent', 'distributor') DEFAULT 'owner',
    device_status ENUM(
        'new',
        'used',
        'used_partially_refurbished',
        'used_deinstalled',
        'used_installed',
        'used_fully_refurbished',
        'surplus'
    ) DEFAULT 'used'
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO devices 
(title, post_status, post_publish_date, transaction_type, price, image_url, tags, location_device, warranty, shipping, seller_role, device_status)
VALUES
-- 1
('iPhone 14 Pro', 'publish', '2025-01-12', 'sale', 1099.00, 'https://images.unsplash.com/photo-1677144646095-ecd95d06cd71?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169', 'smartphone,apple,ios,5g', 'New York, USA', 'yes', 'contact_for_shipping', 'owner', 'used'),
-- 2
('Samsung Galaxy S24', 'publish', '2025-03-05', 'sale', 899.99, 'https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=732', 'android,samsung,flagship', 'Los Angeles, USA', 'included_in_price', 'yes', 'distributor', 'new'),
-- 3
('MacBook Pro M3', 'pending', '2025-02-20', 'sale', 2499.00, 'https://plus.unsplash.com/premium_photo-1733317312273-a37561012283?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'laptop,apple,m3,macos', 'Austin, USA', 'yes', 'no', 'manufacturer', 'new'),
-- 4
('Dell XPS 15', 'publish', '2025-01-22', 'sale', 1599.00, 'https://images.unsplash.com/photo-1622286346003-c5c7e63b1088?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'laptop,dell,windows,ultrabook', 'San Francisco, USA', 'yes', 'yes', 'agent', 'used_partially_refurbished'),
-- 5
('Canon EOS R6 Camera', 'publish', '2025-04-10', 'sale', 1999.00, 'https://images.unsplash.com/photo-1599664223843-9349c75196bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'camera,canon,mirrorless,photography', 'Chicago, USA', 'no', 'contact_for_shipping', 'owner', 'used'),
-- 6
('Lenovo ThinkPad X1 Carbon', 'publish', '2025-02-15', 'sale', 1399.99, 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074', 'laptop,lenovo,business', 'Toronto, Canada', 'included_in_price', 'yes', 'distributor', 'new'),
-- 7
('HP LaserJet Pro Printer', 'pending', '2025-05-02', 'exchange', 350.00, 'https://images.unsplash.com/photo-1674644653898-5edf4ac87c52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176', 'printer,office,hp', 'London, UK', 'no', 'no', 'agent', 'used_deinstalled'),
-- 8
('PlayStation 5 Console', 'publish', '2025-01-29', 'sale', 499.00, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627', 'console,sony,gaming', 'Miami, USA', 'yes', 'yes', 'owner', 'used'),
-- 9
('Xbox Series X', 'publish', '2025-01-18', 'sale', 499.00, 'https://images.unsplash.com/photo-1683823362932-6f7599661d22?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', 'console,microsoft,gaming', 'Dallas, USA', 'included_in_price', 'yes', 'distributor', 'new'),
-- 10
('DJI Mini 4 Drone', 'publish', '2025-04-22', 'sale', 799.99, 'https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1588', 'drone,dji,camera', 'Singapore', 'yes', 'contact_for_shipping', 'manufacturer', 'used_fully_refurbished'),
-- 11
('Bose QC 45 Headphones', 'publish', '2025-03-14', 'sale', 329.99, 'https://images.unsplash.com/photo-1608148118722-56da485f9e84?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1630', 'headphones,bose,audio', 'Berlin, Germany', 'yes', 'yes', 'owner', 'used'),
-- 12
('Apple Watch Ultra', 'publish', '2025-02-10', 'sale', 799.00, 'https://images.unsplash.com/photo-1679436204470-87dc7da1e8be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1025', 'watch,apple,wearable', 'Tokyo, Japan', 'included_in_price', 'contact_for_shipping', 'distributor', 'new'),
-- 13
('Asus ROG Gaming Laptop', 'pending', '2025-05-11', 'sale', 1899.00, 'https://images.unsplash.com/photo-1732020883998-24e6c14fd00d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169', 'gaming,laptop,asus', 'Seoul, Korea', 'no', 'yes', 'owner', 'used_partially_refurbished'),
-- 14
('Google Pixel 8 Pro', 'publish', '2025-01-05', 'sale', 999.00, 'https://images.unsplash.com/photo-1697355360151-2866de32ad4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'android,google,smartphone', 'New Delhi, India', 'yes', 'yes', 'distributor', 'new'),
-- 15
('Nikon D750 DSLR', 'publish', '2025-03-22', 'sale', 1299.00, 'https://images.unsplash.com/photo-1653851794739-5f4eab419938?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764', 'camera,nikon,photography', 'Sydney, Australia', 'included_in_price', 'contact_for_shipping', 'agent', 'used_fully_refurbished'),
-- 16
('Sony Bravia 65" TV', 'publish', '2025-02-02', 'sale', 1599.00, 'https://images.unsplash.com/photo-1680701572796-b8cc1143b97a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'tv,sony,smarttv,oled', 'Paris, France', 'yes', 'yes', 'distributor', 'new'),
-- 17
('Microsoft Surface Pro 10', 'pending', '2025-04-12', 'sale', 1399.00, 'https://images.unsplash.com/photo-1682939894427-59594fac6b06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764', 'tablet,windows,microsoft', 'Dubai, UAE', 'no', 'no', 'manufacturer', 'used'),
-- 18
('GoPro Hero 12', 'publish', '2025-03-09', 'sale', 449.00, 'https://images.unsplash.com/photo-1690176484914-8836dc5f4581?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', 'camera,gopro,action', 'Cape Town, South Africa', 'included_in_price', 'contact_for_shipping', 'owner', 'used_installed'),
-- 19
('OnePlus 12', 'publish', '2025-02-25', 'sale', 849.00, 'https://images.unsplash.com/photo-1662627487895-3bf08b56f2ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627', 'android,smartphone,oneplus', 'Mumbai, India', 'yes', 'yes', 'distributor', 'new'),
-- 20
('LG UltraGear Monitor 27"', 'publish', '2025-04-18', 'sale', 599.00, 'https://images.unsplash.com/photo-1645685491865-42a4fbbc9912?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'monitor,gaming,lg', 'Toronto, Canada', 'yes', 'no', 'manufacturer', 'used_fully_refurbished'),
-- 21
('Raspberry Pi 5 Kit', 'pending', '2025-05-03', 'sale', 199.00, 'https://images.unsplash.com/photo-1629739884912-92f6255f1920?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'electronics,raspberry,kit', 'London, UK', 'included_in_price', 'yes', 'distributor', 'new'),
-- 22
('Apple AirPods Pro 2', 'publish', '2025-02-14', 'sale', 249.00, 'https://images.unsplash.com/photo-1592335509190-ac997442fbef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074', 'audio,apple,earbuds', 'Los Angeles, USA', 'yes', 'contact_for_shipping', 'owner', 'used'),
-- 23
('Samsung Galaxy Tab S10', 'publish', '2025-03-01', 'sale', 699.00, 'https://images.unsplash.com/photo-1703065477962-80bb1b614fd7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735', 'tablet,android,samsung', 'Seoul, Korea', 'yes', 'yes', 'distributor', 'new'),
-- 24
('Asus ProArt Display 32"', 'publish', '2025-03-19', 'sale', 999.00, 'https://images.unsplash.com/photo-1709204424438-89904d47402a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=733', 'monitor,asus,display', 'Tokyo, Japan', 'no', 'contact_for_shipping', 'manufacturer', 'used_deinstalled'),
-- 25
('Fitbit Charge 7', 'publish', '2025-04-07', 'sale', 179.00, 'https://images.unsplash.com/photo-1611270629569-948d94ca915a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', 'fitness,wearable,fitbit', 'Singapore', 'included_in_price', 'yes', 'owner', 'new'),
-- 26
('MSI RTX 4080 GPU', 'publish', '2025-05-15', 'sale', 1299.00, 'https://images.unsplash.com/photo-1621164071312-67bb68821b3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736', 'gpu,graphics,msi', 'New York, USA', 'yes', 'yes', 'distributor', 'used_partially_refurbished'),
-- 27
('Epson EcoTank L3250 Printer', 'publish', '2025-01-16', 'sale', 279.00, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'printer,epson,office', 'London, UK', 'included_in_price', 'yes', 'agent', 'new'),
-- 28
('Realme GT 6', 'pending', '2025-05-22', 'sale', 499.00, 'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=716', 'android,realme,smartphone', 'Bangalore, India', 'yes', 'no', 'owner', 'new'),
-- 29
('Samsung Smart Refrigerator', 'publish', '2025-04-29', 'sale', 2999.00, 'https://images.unsplash.com/photo-1683823363266-efa8cedec4d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687', 'appliance,smart,home', 'Berlin, Germany', 'yes', 'yes', 'manufacturer', 'used_installed'),
-- 30
('Apple Vision Pro', 'publish', '2025-06-10', 'sale', 3499.00, 'https://plus.unsplash.com/premium_photo-1711044006683-a9c3bbcf2f15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', 'vr,ar,apple,vision', 'San Francisco, USA', 'included_in_price', 'yes', 'manufacturer', 'new');