import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserStories, sortData } from '../../actions';
import { STORIES_FETCHED } from '../../actions/types';
import StoryCard from '../../components/StoryCard';
import Filters from './filters';

const List = () => {

    const user = useSelector(state => state.user);
    const story = useSelector(state => state.story);
    const [filterType, setFilterType] = useState('all');
    const [sortType, setSortType] = useState('none');
    const dispatch = useDispatch();

    const sortOptions = [
        {
            text: 'none',
            value: 'none'
        },
        {
            text: 'Complexity High to Low',
            value: 'CHTL'
        },
        {
            text: 'Complexity Low to High',
            value: 'CLTH'
        },
        {
            text: 'id in increasing order',
            value: 'IDIO'
        },
        {
            text: 'id in decreasing order',
            value: 'IDDO'
        }
    ]

    const typeOptions = [
        {
            text: 'All',
            value: 'all'
        },
        {
            text: 'Enhancement',
            value: 'enhancement'
        },
        {
            text: 'Development',
            value: 'development'
        },
        {
            text: 'Bug Fix',
            value: 'bugfix'
        },
        {
            text: 'QA',
            value: 'QA'
        }
    ]

    const fetchUserStories = useCallback(async () => {
        try {
            const response = await getUserStories(user.details.token);
            dispatch({ type: STORIES_FETCHED, payload: response.data });
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, user]);

    useEffect(() => {
        fetchUserStories();
    }, [fetchUserStories])

    let data = sortData(story.list, sortType);

    if (filterType !== 'all') {
        data = data.filter(elem => elem.type === filterType);
    }

    if (!story.list.length) {
        return "No Stories Found";
    }

    return (
        <div className="min-h-screen">
            <Filters
                sortOptions={sortOptions}
                setFilterType={setFilterType}
                setSortType={setSortType}
                typeOptions={typeOptions}
            />
            {!data.length ? (
                <div>No Stories match the filter criteria</div>
            ) : null}
            {
                data.map(elem => {
                    return (
                        <div key={elem.id} className="my-2">
                            <StoryCard story={elem} />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default List;