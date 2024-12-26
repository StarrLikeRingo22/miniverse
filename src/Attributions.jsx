import React from "react"

const Attributions = () => {
  const references = [
    {
      name: "React",
      author: "Meta",
      dateCreated: "May 29, 2013",
      link: "https://reactjs.org/",
    },
    {
      name: "Three.js",
      author: "Mr. Doob",
      dateCreated: "April 2010",
      link: "https://threejs.org/",
    },
    {
      name: "GLTF Loader",
      author: "Three.js Contributors",
      dateCreated: "Unknown",
      link: "https://threejs.org/docs/#examples/en/loaders/GLTFLoader",
    },
    {
      name: "React Router",
      author: "Remix",
      dateCreated: "November 2014",
      link: "https://reactrouter.com/",
    },
    {
      name: "Vite",
      author: "Evan You",
      dateCreated: "April 2020",
      link: "https://vitejs.dev/",
    },
  ]

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Attributions</h1>
      <table
        style={{
          margin: "20px auto",
          borderCollapse: "collapse",
          width: "80%",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Author</th>
            <th style={tableHeaderStyle}>Date Created</th>
            <th style={tableHeaderStyle}>Link</th>
          </tr>
        </thead>
        <tbody>
          {references.map((ref, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={tableCellStyle}>{ref.name}</td>
              <td style={tableCellStyle}>{ref.author}</td>
              <td style={tableCellStyle}>{ref.dateCreated}</td>
              <td style={tableCellStyle}>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const tableHeaderStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
}

const tableCellStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
}

export default Attributions