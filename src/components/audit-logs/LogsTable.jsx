import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/formatDate';

const COLUMNS = [
    'Actor', 'Role', 'Action', 'Resource', 'Resource Type',
    'IP Address', 'Region', 'Severity', 'Status', 'Timestamp',
];

export default function LogsTable({ logs }) {
    return (
        <div className="logs-table-wrapper">
            <table className="logs-table">
                <thead>
                    <tr>
                        {COLUMNS.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log._id}>
                            <td>{log.actor}</td>
                            <td className="capitalize">{log.role}</td>
                            <td>{log.action}</td>
                            <td className="logs-table__resource" title={log.resource}>{log.resource}</td>
                            <td>{log.resourceType}</td>
                            <td>{log.ipAddress}</td>
                            <td className="capitalize">{log.region}</td>
                            <td><SeverityBadge severity={log.severity} /></td>
                            <td><StatusBadge status={log.status} /></td>
                            <td>{formatDate(log.timestamp)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
