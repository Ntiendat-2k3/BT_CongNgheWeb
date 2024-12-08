function TaskList() {
  const tasks = [
    "Học React",
    "Làm bài tập",
    "Đọc sách",
    "Tập thể dục",
    "Ngủ đủ giấc",
  ];

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="mb-4 text-2xl text-xanh-than">Danh sách công việc:</h2>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2 text-xanh-than">•</span>
            <span className="text-gray-700">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
