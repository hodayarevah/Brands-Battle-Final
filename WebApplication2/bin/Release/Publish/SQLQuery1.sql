select * from Brands_TW
drop table Users_TW
insert into category_TW(CatName)
VALUES('Apparel'),('Cars'),('Fast Food'),('Personal Care'),('Retail'),('Technology')
select * from Users_TW
select CatName from Brands_TW where BrandName="Zara"

insert into Brands_TW(BrandName,CatName)
VALUES('Nike','Apparel'),
('Zara','Apparel'),	
('Louis Vuitton','Apparel'),
('Hermes','Apparel'),	
('Gucci','Apparel'),	
('Chanel','Apparel'),
('Prada','Apparel'),	
('Uniqlo','Apparel'),	
('Burberry','Apparel'),	
('Tom Ford','Apparel'),	
('RalphLauren','Apparel'),	
('Next','Apparel'),	
('ASOS','Apparel'),	
('Moncler','Apparel'),	
('Adidas','Apparel'),	
('Toyota','Cars'),	
('MercedesBenzInd',	'Cars'),	
('BMW','Cars'),	
('Ford','Cars'),	
('Chevrolet','Cars'),	
('Jeep','Cars'),	
('Porsche','Cars'),	
('Audi','Cars'),	
('Cadillac','Cars'),	
('Volkswagen','Cars'),	
('Lexus','Cars'),	
('Ferrari','Cars'),	
('Honda','Cars'),	
('McDonalds','Fast Food'),	
('Starbucks','Fast Food'),	
('Subway','Fast Food'),
('KFC','Fast Food'),	
('LorealParisID', 'Personal Care'),	
('Colgate','Personal Care'),	
('Crest','Personal Care'),	
('EsteeLauder','Personal Care'),	
('Dove','Personal Care'),	
('Garnier','Personal Care'),
('Nivea','Personal Care'),	
('Gillette','Personal Care'),	
('Amazon','Retail'),	
('Alibaba','Retail'),	
('HomeDepot','Retail'),	
('Walmart','Retail'),	
('JD_Corporate','Retail'),	
('Costco','Retail'),	
('IKEA','Retail'),	
('Ebay','Retail'),	
('ALDI','Retail'),	
('Google','Technology'),	
('Apple','Technology'),
('Microsoft','Technology'),	
('Tencent','Technology'),	
('Facebook','Technology'),
('IBM','Technology'),	
('SAP','Technology'),	
('Accenture','Technology'),	
('Samsung','Technology'),	
('Intel','Technology'),	
('Baidu','Technology'),	
('Oracle','Technology'),	
('Huawei','Technology'),	
('YouTube','Technology'),	
('Cisco','Technology'),	
('Adobe','Technology'),	
('Salesforce','Technology'),	
('LinkedIn','Technology'),	
('HP','Technology'),
('Instagram','Technology')	







create table category_TW(
CatName varchar(200) primary key
)
create table Brands_TW (
id int IDENTITY(0,1) primary key,
BrandName varchar(200),
CatName varchar(200),
 FOREIGN KEY (CatName) REFERENCES category_TW(CatName)
)
create table Users_TW (
id int IDENTITY(0,1) primary key,
UserName varchar(200),
UserPass varchar(200),
points int,
mail varchar(200)
)

