Table Quaries

CREATE SCHEMA [user];
CREATE SCHEMA [cus];
CREATE SCHEMA [room];
CREATE SCHEMA [boo];
CREATE SCHEMA [pay];
CREATE SCHEMA [inv];
CREATE SCHEMA [hs];
CREATE SCHEMA [st];
CREATE SCHEMA [ser];
CREATE SCHEMA [tab];

-- 🚀 Users Table (Admin, Staff, Customers)
CREATE TABLE [user].users (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('Admin', 'Manager', 'Receptionist', 'Staff', 'Customer')) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    created_at DATETIME DEFAULT GETDATE()
);

-- 🏨 Customers Table
CREATE TABLE [cus].customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    customer_categoryID INT UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    address TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (customer_categoryID) REFERENCES [cus].customerCategory(categoryID)
);

-- 🏨 Customer Categories Table
CREATE TABLE [cus].customerCategory (
    categoryID INT IDENTITY(1,1) PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
	additionalFeeRate VARCHAR(100) DEFAULT 0 NOT NULL,
	additionalFeeAmount VARCHAR(100) DEFAULT 0 NOT NULL,
);

-- 🏠 Room Types Table
CREATE TABLE [room].room_types (
    roomTypeID INT IDENTITY(1,1) PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10,2) NOT NULL
);

-- 🏠 Rooms Table
CREATE TABLE [room].rooms (
    roomID INT IDENTITY(1,1) PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    roomTypeID INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Available', 'Occupied', 'Maintenance')) DEFAULT 'Available',
    FOREIGN KEY (roomTypeID) REFERENCES [room].room_types(roomTypeID) ON DELETE CASCADE
);

-- Table types table
CREATE TABLE [tab].table_types (
    tableTypeID INT IDENTITY(1,1) PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL,
    description TEXT,
    price_per_hour DECIMAL(10,2) NOT NULL
);

-- tables table
CREATE TABLE [tab].tables (
    tableID INT IDENTITY(1,1) PRIMARY KEY,
    table_number VARCHAR(10) UNIQUE NOT NULL,
    tableTypeID INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Available', 'Occupied', 'Maintenance')) DEFAULT 'Available',
    FOREIGN KEY (tableTypeID) REFERENCES [tab].table_types(tableTypeID) ON DELETE CASCADE
);

-- 📅 Bookings Table
CREATE TABLE [boo].bookings (
    bookingID INT IDENTITY(1,1) PRIMARY KEY,
    customerID INT NOT NULL,
    roomID INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    booking_status VARCHAR(20) CHECK (booking_status IN ('Booked', 'Checked-in', 'Checked-out', 'Cancelled')) DEFAULT 'Booked',
    total_price DECIMAL(10,2),
	discount DECIMAL(10,2),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (customerID) REFERENCES [cus].customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (roomID) REFERENCES [room].rooms(roomID) ON DELETE CASCADE
);

-- 💳 Payments Table
CREATE TABLE [pay].payments (
    paymentID INT IDENTITY(1,1) PRIMARY KEY,
    bookingID INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('Cash', 'Card', 'Online')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'Failed')) DEFAULT 'Pending',
    payment_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (bookingID) REFERENCES [boo].bookings(bookingID) ON DELETE CASCADE
);

-- 🧾 Invoices Table
CREATE TABLE [inv].invoices (
    invoiceID INT IDENTITY(1,1) PRIMARY KEY,
    bookingID INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    invoice_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (bookingID) REFERENCES [boo].bookings(bookingID) ON DELETE CASCADE
);

-- 🏨 Room Status Table (Availability Tracker)
CREATE TABLE [room].room_status (
    roomStatusID INT IDENTITY(1,1) PRIMARY KEY,
    roomID INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Available', 'Occupied', 'Maintenance')) DEFAULT 'Available',
    FOREIGN KEY (roomID) REFERENCES [room].rooms(roomID) ON DELETE CASCADE
);

-- 🛏️ Housekeeping Table (Cleaning & Maintenance)
CREATE TABLE [hs].housekeeping (
    housekeepingID INT IDENTITY(1,1) PRIMARY KEY,
    roomID INT NOT NULL,
    staffID INT NOT NULL,
    cleaning_date DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
    FOREIGN KEY (roomID) REFERENCES [room].rooms(roomID) ON DELETE CASCADE,
    FOREIGN KEY (staffID) REFERENCES [user].users(userID) ON DELETE CASCADE
);

-- 🏢 Staff Table
CREATE TABLE [st].staff (
    staffID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    NIC VARCHAR(50) NOT NULL,
    mobileNumber VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    hired_date DATE NOT NULL,
    FOREIGN KEY (userID) REFERENCES [user].users(userID) ON DELETE CASCADE
);

-- 🎭 Roles Table (Role-Based Access Control)
CREATE TABLE [user].roles (
    roleID INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(20) CHECK (role_name IN ('Admin', 'Manager', 'Receptionist', 'Staff')) NOT NULL,
    permissions NVARCHAR(MAX) -- JSON format for permissions
);

-- 🏨 Extra Services (Spa, Laundry, etc.)
CREATE TABLE [ser].extra_services (
    serviceID INT IDENTITY(1,1) PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

-- 🛎️ Service Orders Table (Customer Requests)
CREATE TABLE [ser].service_orders (
    serviceOrderID INT IDENTITY(1,1) PRIMARY KEY,
    bookingID INT NOT NULL,
    serviceID INT NOT NULL,
    order_date DATETIME DEFAULT GETDATE(),
    status VARCHAR(20) CHECK (status IN ('Requested', 'Completed')) DEFAULT 'Requested',
    FOREIGN KEY (bookingID) REFERENCES [boo].bookings(bookingID) ON DELETE CASCADE,
    FOREIGN KEY (serviceID) REFERENCES [ser].extra_services(serviceID) ON DELETE CASCADE
);
