const formElem = document.querySelector("form");
formElem.addEventListener("submit", async (e) => {
  e.preventDefault();
  let res = await fetch("/upload", {
    method: "POST",
    body: new FormData(formElem),
  });
  if (res.status === 200) {
    document.getElementById("Files").value = "";
    alert("file uploaded success");
  } else {
    alert("something went wrong");
  }
});

const shareFileForm = document.getElementById("shareFile");
shareFileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let res = await fetch("/share-file", {
    method: "POST",
    body: new FormData(shareFileForm),
  });
  if (res.status === 200) {
    alert("file shared successfully");
  } else {
    alert("someting went wrong");
  }
});
