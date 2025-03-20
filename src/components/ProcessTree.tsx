import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import api from '../services/api';
import { Process } from '../../types';

interface ProcessTreeProps {
    refresh: boolean;
}

interface Area {
    id: string;
    name: string;
    created_at: string;
}

const ProcessTree: React.FC<ProcessTreeProps> = ({ refresh }) => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedArea, setSelectedArea] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const processesResponse = await api.get<{ processes: Process[] }>('/process');
                setProcesses(processesResponse.data.processes);

                const areasResponse = await api.get<{ areas: Area[] }>('/area');
                setAreas(areasResponse.data.areas);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [refresh]);

    useEffect(() => {
        if (processes.length > 0 && areas.length > 0) {
            const filteredProcesses = selectedArea === 'all'
                ? processes
                : processes.filter((p) => p.area_id === selectedArea);

            const { nodes: newNodes, edges: newEdges } = convertToReactFlowElements(filteredProcesses);
            setNodes(newNodes);
            setEdges(newEdges);
        }
    }, [processes, selectedArea, areas]);

    const convertToReactFlowElements = (processes: Process[]) => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];
        let x = 50;
        let y = 50;

        const createNodesAndEdges = (process: Process, parentId?: string, color?: string) => {
            const nodeStyle = {
                backgroundColor: color || '#fff',
                border: '2px solid #000',
                width: window.innerWidth < 600 ? 100 : 150,
                height: window.innerWidth < 600 ? 50 : 75,
                fontSize: window.innerWidth < 600 ? '12px' : '14px',
            };

            const node: Node = {
                id: process.id,
                data: { label: process.name },
                position: { x, y },
                type: 'default',
                style: nodeStyle,
            };
            nodes.push(node);
        
            if (parentId) {
                const edge: Edge = {
                    id: `${parentId}-${process.id}`,
                    source: parentId,
                    target: process.id,
                    type: 'smoothstep',
                };
                edges.push(edge);
            }
        
            const children = processes.filter((p) => p.father_process === process.id);
        
            if (children.length > 0) {
                y += 100;
                x -= (children.length * 150) / 2;
        
                children.forEach((child) => {
                    createNodesAndEdges(child, process.id, color);
                    x += 150;
                });
        
                y -= 100;
            }
        };

        const rootProcesses = processes.filter((process) => !process.father_process);

        rootProcesses.forEach((rootProcess) => {
            const color = getColorForArea(rootProcess.area_id);
            createNodesAndEdges(rootProcess, undefined, color);
            y += 200;
        });

        return { nodes, edges };
    };

    const getColorForArea = (areaId: string) => {
        const colors = ['#FFCC99', '#99CCFF', '#99FF99', '#FF9999', '#CC99FF'];
        const index = areas.findIndex((a) => a.id === areaId) % colors.length;
        return colors[index];
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
                <label htmlFor="area-select">Selecione a área: </label>
                <select
                    id="area-select"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px' }}
                >
                    <option value="all">Todos</option>
                    {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                            {area.name}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                onNodeClick={(event, node) => {
                    console.log('Node clicked:', node.id);
                    navigate(`/process-details/${node.id}`);
                }}
                zoomOnScroll={true}
                zoomOnPinch={true}
                panOnScroll={true}
                panOnDrag={true}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
            </div>
        </div>
    );
};

export default ProcessTree;