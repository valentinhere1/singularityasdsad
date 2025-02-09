import { useRenderQueue } from '../stores/useRenderQueue';

export const RenderQueue = () => {
  const { queue } = useRenderQueue();

  return (
    <div className="render-queue">
      <h4>Render Queue</h4>
      {queue.map(task => (
        <div key={task.id} className="queue-item">
          <div className="progress-bar" style={{ width: `${task.progress}%` }} />
          <span>{task.name} - {task.progress}%</span>
        </div>
      ))}
    </div>
  );
};