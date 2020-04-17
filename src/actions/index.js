import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

// here action creator returns a func (manually dispatching the action) , thats possible for redux-thunk middleware
export const fetchPosts =  () =>  async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
    };

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    
    dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));

    //same as above two lines of code with lodash chain method.
    _.chain(getState().posts)
        .map('userId')
            .uniq()
                .forEach(id => dispatch(fetchUser(id)))
                    .value();
};

//when need to memoize a function, do it outside of action creator
//one time fetch possible with this code

//memoized version
// export const fetchUser = (id) => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
    
//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });