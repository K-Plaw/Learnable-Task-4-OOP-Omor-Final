//TITLE: PLAW's Big Fat Burger & Sitout Order Management System
//DESCRIPTION: This system allows customers to view through the menu list, select items of their choice, pay for their items of choice, and see the name of the waiter responsible for their order. This system also enables the manager to update items on the menu where necessary.
//
// Defining MenuItem class
class MenuItem {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    getItemDetails() {
        return `${this.name}: ${this.description} - ₦${this.price}`;
    }

    static menuList() {
        return [
            new MenuItem("Burger", "Delicious Beef Burger with all the meaty goodness", 3500),
            new MenuItem("Fries", "Crispy golden fries", 2000),
            new MenuItem("Pizza", "Cheesy pizza with extra toppings", 7000)
        ];
    }
}

// Modified Manager class to manage waiters and now with a password attribute
class Manager {
    constructor(name, password) {
        this.name = name;
        this.password = password; // Added password as a normal attribute
        this.waiters = Waiter.availableWaiters();  // Initialize with available waiters
    }

    // Method to add a new waiter
    addWaiter(name) {
        const newWaiter = new Waiter(name);
        this.waiters.push(newWaiter);
        console.log(`Manager ${this.name} has added a new waiter: ${name}`);
        return `New waiter ${name} added successfully.`;
    }

    // Method to edit an existing waiter by name
    editWaiter(oldName, newName) {
        const waiter = this.waiters.find(waiter => waiter.name === oldName);
        if (waiter) {
            waiter.name = newName;
            console.log(`Manager ${this.name} has updated the waiter: ${oldName} to ${newName}`);
            return `Waiter ${oldName} updated to ${newName}.`;
        } else {
            console.log(`Waiter ${oldName} not found.`);
            return `Error: Waiter ${oldName} not found.`;
        }
    }

    // Method to remove a waiter by name
    removeWaiter(name) {
        const index = this.waiters.findIndex(waiter => waiter.name === name);
        if (index !== -1) {
            this.waiters.splice(index, 1);
            console.log(`Manager ${this.name} has removed the waiter: ${name}`);
            return `Waiter ${name} removed successfully.`;
        } else {
            console.log(`Waiter ${name} not found.`);
            return `Error: Waiter ${name} not found.`;
        }
    }

    // Method to manage menu items (unchanged)
    addItem(menuItems, name, description, price) {
        const newItem = new MenuItem(name, description, price);
        menuItems.push(newItem);
        console.log(`Manager ${this.name} has added a new item: ${name}`);
        return `New item ${name} added successfully.`;
    }

    editItem(menuItems, name, newDescription, newPrice) {
        const item = menuItems.find(item => item.name === name);
        if (item) {
            item.description = newDescription;
            item.price = newPrice;
            console.log(`Manager ${this.name} has updated the item: ${name}`);
            return `Item ${name} updated successfully.`;
        } else {
            console.log(`Item ${name} not found.`);
            return `Error: Item ${name} not found.`;
        }
    }

    removeItem(menuItems, name) {
        const index = menuItems.findIndex(item => item.name === name);
        if (index !== -1) {
            menuItems.splice(index, 1);
            console.log(`Manager ${this.name} has removed the item: ${name}`);
            return `Item ${name} removed successfully.`;
        } else {
            console.log(`Item ${name} not found.`);
            return `Error: Item ${name} not found.`;
        }
    }
}

// Waiter class
class Waiter {
    constructor(name) {
        this.name = name;
    }

    serveOrder(order) {
        console.log(`Please wait a little while as our waiter, ${this.name} serves your order.`);
    }

    static availableWaiters() {
        return [
            new Waiter("Chioma"),
            new Waiter("Godswill"),
            new Waiter("Patrick")
        ];
    }
}

// Function to handle rotational waiter assignment and customer orders
let waiterIndex = 0;  // Start with the first waiter

function handleOrder(customer, selectedIndices) {
    // Customer views the menu
    customer.viewMenu(MenuItem.menuList());

    // Customer selects items from the menu (pass selected indices from function arguments)
    customer.selectItems(MenuItem.menuList(), selectedIndices);

    // Show selected items
    customer.showSelectedItems();

    // Calculate total
    const totalAmount = customer.calculateTotal();
    console.log(`${customer.name}'s total: ₦${totalAmount}`);

    // Waiter serves the order
    const waiter = Waiter.availableWaiters()[waiterIndex];
    waiter.serveOrder(customer.order);

    // Move to the next waiter in the array (rotationally)
    waiterIndex = (waiterIndex + 1) % Waiter.availableWaiters().length;
}

// Customer class with registration
class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.order = [];
        console.log(`Customer ${this.name} has been registered.`);
    }

    // Method to view the menu
    viewMenu(menuItems) {
        console.log(`${this.name} is viewing the menu:`);
        menuItems.forEach((item, index) => {
            console.log(`[${index + 1}] ${item.getItemDetails()}`);
        });
    }

    // Method to select items from the menu
    selectItems(menuItems, selectedIndices) {
        selectedIndices.forEach(index => {
            const item = menuItems[index - 1]; // Adjust for 0-indexed array
            if (item) {
                this.order.push(item);
                console.log(`${this.name} has selected ${item.name}`);
            } else {
                console.log(`Invalid selection: Item ${index} does not exist.`);
            }
        });
    }

    // Show the Menu items selected by the customer
    showSelectedItems() {
        console.log(`${this.name} has selected the following items:`);
        this.order.forEach(item => {
            console.log(item.getItemDetails());
        });
    }

    // Method to calculate total price
    calculateTotal() {
        let total = 0;
        this.order.forEach(item => total += item.price);
        return total;
    }
}

/*
// Example Usage:

const menuItems = MenuItem.menuList();
const manager = new Manager("Oga", "secret123");  // Manager now has a password

// Manager adds, edits, and removes waiters using "Okon" and "Utibima"
manager.addWaiter("Okon");  // Add "Okon" as a new waiter
manager.editWaiter("Godswill", "Utibima");  // Change "Godswill" to "Utibima"
manager.removeWaiter("Patrick");  // Remove "Patrick" from the list

// Function calls for customer orders
const customer1 = new Customer("Etukudoh", "etukudoh01@gmail.com");
handleOrder(customer1, [1, 3]);  // Customer 1 selects the first and third items (Burger, Fries)

const customer2 = new Customer("Emmanuel", "emmanuel@yahoo.com");
handleOrder(customer2, [1, 3]);  // Customer 2 selects the first and third items (Burger, Fries)

const customer3 = new Customer("Grace", "grace@outlook.com");
handleOrder(customer3, [1, 2]);  // Customer 3 selects the first and second items (Burger, Fries)
*/
