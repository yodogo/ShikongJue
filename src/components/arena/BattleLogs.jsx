import React, { forwardRef } from 'react';

/**
 * Battle log display panel
 */
const BattleLogs = forwardRef(({ logs, width = '80%', height = '150px', marginTop = '2rem' }, ref) => {
    return (
        <div
            className="battle-logs glass-panel"
            style={{ width, height, marginTop }}
        >
            <div style={{ height: '100px', overflowY: 'auto' }}>
                {logs.map((log, i) => (
                    <div key={i} className="log-entry">{log}</div>
                ))}
                <div ref={ref} />
            </div>
        </div>
    );
});

BattleLogs.displayName = 'BattleLogs';

export default BattleLogs;
