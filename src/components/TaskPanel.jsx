import {
  useEffect,
  useState,
} from "react"

function TaskPanel() {
  const [task, setTask] =
    useState("")

  const [tasks, setTasks] =
    useState([])

  useEffect(() => {
    const savedTasks =
      localStorage.getItem(
        "aethrix_tasks"
      )

    if (savedTasks) {
      setTasks(
        JSON.parse(savedTasks)
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "aethrix_tasks",
      JSON.stringify(tasks)
    )
  }, [tasks])

  const addTask = () => {
    if (!task.trim()) return

    setTasks((prev) => [
      ...prev,
      {
        text: task,

        completed: false,
      },
    ])

    setTask("")
  }

  const toggleTask = (index) => {
    const updated = [...tasks]

    updated[index].completed =
      !updated[index].completed

    setTasks(updated)
  }

  const deleteTask = (index) => {
    const updated =
      tasks.filter(
        (_, i) => i !== index
      )

    setTasks(updated)
  }

  return (
    <div
      style={{
        marginBottom: "30px",

        padding: "24px",

        borderRadius: "24px",

        background:
          "rgba(255,255,255,0.05)",

        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2>
        ✅ AI Task Manager
      </h2>

      <div
        style={{
          display: "flex",

          gap: "12px",

          marginTop: "20px",
        }}
      >
        <input
          value={task}
          onChange={(e) =>
            setTask(
              e.target.value
            )
          }
          placeholder="Add a task..."
          style={{
            flex: 1,

            padding: "14px",

            borderRadius:
              "14px",

            border: "none",

            background:
              "#0f172a",

            color: "white",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding:
              "14px 20px",

            borderRadius:
              "14px",

            border: "none",

            background:
              "linear-gradient(to right, #3b82f6, #8b5cf6)",

            color: "white",

            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div
        style={{
          display: "flex",

          flexDirection:
            "column",

          gap: "14px",

          marginTop: "24px",
        }}
      >
        {tasks.map(
          (item, index) => (
            <div
              key={index}
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                padding: "16px",

                borderRadius:
                  "16px",

                background:
                  "#0f172a",

                opacity:
                  item.completed
                    ? 0.6
                    : 1,
              }}
            >
              <div
                onClick={() =>
                  toggleTask(index)
                }
                style={{
                  cursor:
                    "pointer",

                  flex: 1,

                  textDecoration:
                    item.completed
                      ? "line-through"
                      : "none",
                }}
              >
                {item.completed
                  ? "✅ "
                  : "⬜ "}
                {item.text}
              </div>

              <button
                onClick={() =>
                  deleteTask(index)
                }
                style={{
                  border: "none",

                  background:
                    "transparent",

                  color: "#ef4444",

                  cursor: "pointer",

                  fontSize: "18px",
                }}
              >
                ✕
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default TaskPanel