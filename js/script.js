document.addEventListener("DOMContentLoaded", () => {
  const weekItems = document.querySelectorAll(".week-list li");
  const weekContents = document.querySelectorAll(".week-content");

  weekItems.forEach((item) => {
    item.addEventListener("click", () => {
      weekItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      weekContents.forEach((content) => (content.style.display = "none"));
      const selectedWeek = document.getElementById(
        item.getAttribute("data-week")
      );
      if (selectedWeek) {
        selectedWeek.style.display = "block";
      }

      const activeDropdowns = document.querySelectorAll(
        ".exercise-list li.active"
      );
      activeDropdowns.forEach((dropdown) =>
        dropdown.classList.remove("active")
      );

      // const notAvailableLinks = document.querySelectorAll('a.not-available');
      // notAvailableLinks.forEach(link => {
      //   link.addEventListener('click', function(event) {
      //     event.preventDefault(); 
      //     alert('Bài tập này hiện chưa hoàn thành. Vui lòng quay lại sau!');
      //   });
      // });
    });
  });

  const exerciseTitles = document.querySelectorAll(".exercise-title");

  exerciseTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const parentLi = title.parentElement;

      parentLi.classList.toggle("active");

      const icon = title.querySelector("i");
      if (parentLi.classList.contains("active")) {
        icon.style.transform = "rotate(180deg)";
      } else {
        icon.style.transform = "rotate(0deg)";
      }

      exerciseTitles.forEach((otherTitle) => {
        if (otherTitle !== title) {
          otherTitle.parentElement.classList.remove("active");
          otherTitle.querySelector("i").style.transform = "rotate(0deg)";
        }
      });
    });
  });
});
