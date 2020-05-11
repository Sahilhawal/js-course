/*----------BUDGET CONTROLLER-------------------*/
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (current) {
      sum += current.value;
    });
    data.total[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    // Adding item to data structure
    addItem: function (type, desc, val) {
      var newItem, ID;
      if (data.allItems[type].length) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        newItem = new Expense(ID, desc, val);
      } else if (type === "inc") {
        newItem = new Income(ID, desc, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    // Calculating budget
    calculateBudget: function () {
      calculateTotal("exp");
      calculateTotal("inc");
      data.budget = data.total.inc - data.total.exp;
      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    //Returning budget details
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.total.percentage,
      };
    },
    // Deleting item from data structure
    deleteItem: function (type, id) {
      var ids, index;
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      index = ids.indexOf(id);
      console.log(ids, index, id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    // calculating percentages for all expenses using prototype method
    calculatePercentages: function () {
      data.allItems.exp.forEach(function (current) {
        current.calcPercentage(data.total.inc);
      });
    },
    // Returning percentages for all expenses using prototype method
    getPercentages: function () {
      var allPercents = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });
      return allPercents;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

/*----------------UI CONTROLLER----------------------*/
var UIController = (function () {
  var DOMString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expPercentageLabel: ".item__percentage",
  };

  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  /****Returning Methods from UI controller*****/
  return {
    //Getting values of input
    getInput: function () {
      return {
        type: document.querySelector(DOMString.inputType).value,
        description: document.querySelector(DOMString.inputDescription).value,
        value: parseFloat(document.querySelector(DOMString.inputValue).value),
      };
    },
    // Returning(Sharing) DOM strings
    getDOMstrings: function () {
      return DOMString;
    },
    //Adding item to UI
    addListItem: function (obj, type) {
      var html, element;
      if (type === "inc") {
        element = DOMString.incomeContainer;
        html = `<div class="item clearfix" id="inc-${obj.id}"> <div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${obj.value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else if (type === "exp") {
        element = DOMString.expenseContainer;
        html = `<div class="item clearfix" id="exp-${obj.id}"><div class="item__description">${obj.description}</div><div class="right clearfix"><div class="item__value">${obj.value}</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      }
      document.querySelector(element).insertAdjacentHTML("beforeend", html);
    },
    //Clearing fields after adding item
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMString.inputDescription + "," + DOMString.inputValue
      );

      var fieldsArray = Array.prototype.slice.call(fields);
      fieldsArray.forEach(function (current, index, array) {
        current.value = "";
      });
      fieldsArray[0].focus();
    },
    //Deleting item from UI
    deleteListItem: function (id) {
      var el;
      el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    // Displaying budget on UI
    displayBudget: function (obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOMString.budgetLabel).textContent = obj.budget;

      document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMString.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = "---";
      }
    },
    //Displaying percentages
    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DOMString.expPercentageLabel);

      nodeListForEach(fields, function (current, index) {
        console.log(percentages, fields, current, index);
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + " %";
        } else {
          current.textContent = "----";
        }
      });
    },
  };
})();

/*------------------MAIN CONTROLLER-----------------*/
var controller = (function (budgetCtrl, UICtrl) {
  /****Setting Up Event Listeners***********/
  var setupEventListeners = function () {
    var DOMstr = UICtrl.getDOMstrings();

    document
      .querySelector(DOMstr.inputButton)
      .addEventListener("click", function () {
        ctrlAddItem();
      });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOMstr.container)
      .addEventListener("click", ctrlDeleteitem);
  };

  // Updating Budget
  var updateBudget = function () {
    budgetCtrl.calculateBudget();
    var budget = budgetCtrl.getBudget();
    UICtrl.displayBudget(budget);
  };

  //Control Add Item
  var ctrlAddItem = function () {
    var input, newItem;
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value !== 0) {
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();
      updateBudget();
      updatePercentages();
    }
  };

  //Control Delete Item
  var ctrlDeleteitem = function () {
    var itemID, splitId, type, id;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);
    splitId = itemID.split("-");
    type = splitId[0];
    id = parseInt(splitId[1]);

    budgetCtrl.deleteItem(type, id);
    UICtrl.deleteListItem(itemID);
    updateBudget();
    updatePercentages();
  };

  //Calculate Percentages
  var updatePercentages = function () {
    console.log("Calculating percentages started");
    budgetCtrl.calculatePercentages();
    var allPer = budgetCtrl.getPercentages();
    console.log(allPer);
    UICtrl.displayPercentages(allPer);
  };

  return {
    init: function () {
      console.log("application has stareted");
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
    },
  };
})(budgetController, UIController);

controller.init();
