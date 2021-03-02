import { ExportTaskEntity } from 'examples/models/ExportTaskEntity';
declare const TaskPlugin: {
    install(options: {
        url: string;
        token: string;
        taskApi: string;
        userId: number;
        callback: (data: ExportTaskEntity[]) => void;
    }): void;
    sendMessage: () => any;
};
export default TaskPlugin;
