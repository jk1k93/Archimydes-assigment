import React from 'react';
import { Card, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { STORY_ACCEPTED, STORY_REJECTED } from '../actions/types';

function StoryCard({ story }) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const storyAccepted = () => {
        dispatch({ type: STORY_ACCEPTED, id: story.id });
    }

    const storyRejected = () => {
        dispatch({ type: STORY_REJECTED, id: story.id });
    }

    return (
        <Card title={(
            <div className={`${story.status === 'accepted' ? 'bg-green text-white p-2' : story.status === 'rejected' ? 'bg-red text-white p-2' : ''}`}>{story.summary}</div>
        )}>
            <div className="mb-2">
                <span className="font-bold">id: </span>{story.id}
            </div>
            <div className="mb-2">
                <span className="font-bold">Description: </span>{story.description}
            </div>
            <div className="mb-2">
                <span className="font-bold">Type: </span>{story.type}
            </div>
            <div className="mb-2">
                <span className="font-bold">Complexity: </span><span className={`font-bold complexity-${story.complexity}`}>{story.complexity}</span>
            </div>
            <div className="mb-2">
                <span className="font-bold">Estimated Time: </span>{story.estimatedHrs}hrs
            </div>
            <div className="mb-2">
                <span className="font-bold">Cost: </span>{story.cost}
            </div>
            {user.details.role === 'Admin' && !story.status ? (
                <div className="mb-2">
                    <Button onClick={storyAccepted} className="mr-2" type="primary">Accept</Button>
                    <Button onClick={storyRejected} type="error" danger>Reject</Button>
                </div>
            ) : null}
        </Card>
    )
}

export default StoryCard;