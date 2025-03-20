export interface Area {
    id: string;
    name: string;
    created_at: string;
}

export interface Process {
    id: string;
    name: string;
    tools: string;
    responsibles: string;
    documentations: string;
    father_process: string | null;
    area_id: string;
    created_at: string;
    children?: Process[];
}