--create database WhatIsForDinnerDb;

--use WhatIsForDinnerDb;

--create table Accounts(
--	Id int primary key identity(1,1),--	[Name] nvarchar(20),--	Email nvarchar (30),--	[Password] nvarchar (30),
--);

--insert into Accounts ([Name], Email, [Password])
--values ('Tim', 'timothy.t.holleque@gamil.com', 'Layla'),
--('Yiding', 'yiding.wang82@gmail.com', 'password');

--create table Favorites(
--	Id int primary key identity(1,1),
--	accountId int foreign key references Accounts(Id),
--	recipeId int
--);
