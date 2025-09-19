import ThoughtList from "./ThoughtList";

function App() {
  return (
    <>
      <ThoughtList
        thoughts={[
          {
            title: "Have to see Proxmox",
            description:
              "Proxmox is a High Availability server. I have to learn it",
            createdAt: Date.now(),
            priority: "High",
          },
          {
            title: "Have to see Proxmox",
            description:
              "Proxmox is a High Availability server. I have to learn it",
            createdAt: Date.now(),
            priority: "Medium",
          },
          {
            title: "Have to see Proxmox",
            description:
              "Proxmox is a High Availability server. I have to learn it",
            createdAt: Date.now(),
            priority: "Low",
          },
          {
            title: "Have to see Proxmox",
            description:
              "Proxmox is a High Availability server. I have to learn it",
            createdAt: Date.now(),
            priority: "Low",
          },
          {
            title: "Have to see Proxmox",
            description:
              "Proxmox is a High Availability server. I have to learn it",
            createdAt: Date.now(),
            priority: "Low",
          },
        ]}
      />
    </>
  );
}

export default App;
