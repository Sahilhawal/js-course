const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3, 4]);
  });
});

getIDs.then((IDs) => {
  console.log(IDs);
});
