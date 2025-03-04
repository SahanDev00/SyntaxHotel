
-- Schema creation
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
CREATE SCHEMA [sal];
CREATE SCHEMA [note];
CREATE SCHEMA [syst];
CREATE SCHEMA [charts];

-- table creation

-- 🚀 Users Table (Admin, Staff, Customers)
CREATE TABLE [user].users (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('Admin', 'Manager', 'Receptionist', 'Staff', 'Customer')) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    status VARCHAR(20) CHECK (status IN ('Active', 'Innactive')) DEFAULT 'Active',
    created_at DATETIME DEFAULT GETDATE()
);

-- 🎭 Roles Table (Role-Based Access Control)
CREATE TABLE [user].roles (
    roleID INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(20) CHECK (role_name IN ('Admin', 'Manager', 'Receptionist', 'Staff')) NOT NULL,
    permissions NVARCHAR(MAX) -- JSON format for permissions
);

-- 🏨 Customer Categories Table
CREATE TABLE [cus].customerCategory (
    categoryID INT IDENTITY(1,1) PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
	additionalFeeRate VARCHAR(100) DEFAULT 0 NOT NULL,
	additionalFeeAmount VARCHAR(100) DEFAULT 0 NOT NULL,
);

-- 🏨 Customers Table
CREATE TABLE [cus].customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    customer_categoryID INT UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    address TEXT,
    status VARCHAR(20) CHECK (status IN ('Active', 'Innactive', 'Banned')) DEFAULT 'Active',
    banned_reason TEXT ,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (customer_categoryID) REFERENCES [cus].customerCategory(categoryID)
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
    roomID INT,
    tableID INT,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    booking_status VARCHAR(20) CHECK (booking_status IN ('Booked', 'Checked-in', 'Checked-out', 'Cancelled')) DEFAULT 'Booked',
    total_price DECIMAL(10,2),
    paid_price DECIMAL(10,2),
    staffID INT NOT NULL,
    paid_status VARCHAR(20) CHECK (paid_status IN ('Paid', 'Pending', 'Cancelled')) DEFAULT 'Pending',
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (customerID) REFERENCES [cus].customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (roomID) REFERENCES [room].rooms(roomID) ON DELETE CASCADE,
    FOREIGN KEY (tableID) REFERENCES [tab].tables(tableID) ON DELETE CASCADE,
    FOREIGN KEY (staffID) REFERENCES [user].users(userID) ON DELETE CASCADE
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

-- 🏢 Staff positions Table
CREATE TABLE [st].staff_positions (
    positionID INT IDENTITY(1,1) PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL
);

-- 🏢 Staff Table
CREATE TABLE [st].staff (
    staffID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    NIC VARCHAR(50) NOT NULL,
    mobileNumber VARCHAR(50) NOT NULL,
    positionID INT NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    hired_date DATE NOT NULL,
    created_date DATETIME DEFAULT GETDATE()
    status VARCHAR(20) CHECK (status IN ('Active', 'Innactive', 'Resigned')) DEFAULT 'Active',
    FOREIGN KEY (userID) REFERENCES [user].users(userID) ON DELETE CASCADE,
    FOREIGN KEY (positionID) REFERENCES [st].staff_positions(positionID)
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
    status VARCHAR(20) CHECK (status IN ('Requested', 'In-Progress' 'Completed', 'Cancelled')) DEFAULT 'Requested',
    cancelled_reason VARCHAR(MAX),
    total_price DECIMAL(10,2),
    paid_price DECIMAL(10,2),
    staffID INT NOT NULL,
    paid_status VARCHAR(20) CHECK (paid_status IN ('Paid', 'Pending', 'Cancelled')) DEFAULT 'Pending',
    FOREIGN KEY (bookingID) REFERENCES [boo].bookings(bookingID),
    FOREIGN KEY (serviceID) REFERENCES [ser].extra_services(serviceID),
    FOREIGN KEY (staffID) REFERENCES [user].users(userID)
);

-- 🛎️ inventory Table 
CREATE TABLE [inv].inventory (
    itemID INT IDENTITY(1,1) PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    item_description VARCHAR(MAX) NOT NULL,
    itemPrice DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Available', 'Unavailable')) DEFAULT 'Available'
);

-- customer orders table
CREATE TABLE [cus].customer_orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    bookingID INT NOT NULL,
    OrderedItems NVARCHAR(MAX), -- JSON format for permissions
    paid_status VARCHAR(20) CHECK (status IN ('Paid', 'Not Paid', 'Cancelled')) DEFAULT 'Not Paid',
    order_date DATETIME DEFAULT GETDATE()
    FOREIGN KEY (bookingID) REFERENCES [boo].bookings(bookingID),
)

-- 🛎️ inventory Table 
CREATE TABLE [note].hotel_notes (
    noteID INT IDENTITY(1,1) PRIMARY KEY,
    note VARCHAR(MAX) NOT NULL,
    userID INT Not Null,
    FOREIGN KEY (userID) REFERENCES [user].users(userID)
);

-- Settings table
CREATE TABLE [syst].Settings (
	SettingID INT IDENTITY(1,1) PRIMARY KEY,
	SettingName VARCHAR(MAX) NOT NULL,
	SettingValue VARCHAR(MAX) NOT NULL
)

-- monthly sales table
CREATE TABLE [charts].monthly_sales (
    SaleID INT IDENTITY(1,1) PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    sales INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Customer Growth table
CREATE TABLE [charts].customer_growth (
    growthID INT IDENTITY(1,1) PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    newCustomers INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Events table
CREATE TABLE [charts].events (
    eventID INT IDENTITY(1,1) PRIMARY KEY,
    date DATE NOT NULL,
    event VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);


-- table changes
INSERT INTO syst.Settings (SettingName, SettingValue) VALUES ('APIKey', '0661');
INSERT INTO syst.Settings (SettingName, SettingValue) VALUES ('Version', '0.01');

INSERT INTO [charts].monthly_sales (month, sales) VALUES ('January', '0');
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('February', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('March', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('April', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('May', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('June', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('July', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('August', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('September', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('October', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('November', 0);
INSERT INTO [charts].monthly_sales (month, sales) VALUES ('December', 0);

INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('January', '0');
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('February', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('March', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('April', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('May', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('June', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('July', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('August', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('September', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('October', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('November', 0);
INSERT INTO [charts].customer_growth (month, newCustomers) VALUES ('December', 0);