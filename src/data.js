import { v4 as uuidv4 } from 'uuid';

// In-memory storage — data sementara (sesuai kebutuhan minimal tugas)
let assets = [
  {
    id: uuidv4(),
    name: "Cisco Nexus 9000",
    type: "Switch",
    rack_position: "R-01-U10",
    status: "active",
    ip_address: "192.168.1.10",
    created_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Dell PowerEdge R750",
    type: "Server",
    rack_position: "R-02-U04",
    status: "maintenance",
    ip_address: "192.168.1.20",
    created_at: new Date().toISOString(),
  },
];

export default assets;
