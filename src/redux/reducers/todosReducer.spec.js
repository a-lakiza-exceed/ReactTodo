import { todosReducer } from './todosReducer'
import * as types from '../types/actionTypes'

const initialState = {
    todos: [],
    areAllCompleted: false
};

describe('todos reducer', () => {
    it('should handle initial state', () => {
        expect(
            todosReducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle ADD_TODO', () => {
        expect(
            todosReducer(initialState, {
                type: types.ADD_TODO,
                payload: {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                }
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                }
            ],
            areAllCompleted: false
        })

        expect(
            todosReducer({
                todos: [{
                    text: 'test todo1',
                    isCompleted: false,
                    _id: 1
                }],
                areAllCompleted: false
            }, {
                type: types.ADD_TODO,
                payload: {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                }
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                },
                {
                    text: 'test todo1',
                    isCompleted: false,
                    _id: 1
                },
            ],
            areAllCompleted: false
        })

    })

    it('should handle DELETE_TODO', () => {
        expect(
            todosReducer({
                todos: [
                    {
                        text: 'test todo',
                        isCompleted: false,
                        _id: 0
                    },
                    {
                        text: 'test todo1',
                        isCompleted: false,
                        _id: 1
                    },
                ],
                areAllCompleted: false
            }, {
                type: types.REMOVE_TODO,
                payload: 1
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                }
            ],
            areAllCompleted: false
        })
    })

    it('should handle EDIT_TODO', () => {
        expect(
            todosReducer({
                todos: [
                    {
                        text: 'test todo',
                        isCompleted: false,
                        _id: 0
                    },
                    {
                        text: 'test todo1',
                        isCompleted: false,
                        _id: 1
                    },
                ],
                areAllCompleted: false
            }, {
                type: types.EDIT_TODO,
                payload: {
                    text: 'edit test',
                    id: 1
                }

            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                },
                {
                    text: 'edit test',
                    isCompleted: false,
                    _id: 1
                },
            ],
            areAllCompleted: false
        })
    })

    it('should handle COMPLETE_TODO', () => {
        expect(
            todosReducer({
                todos: [
                    {
                        text: 'test todo',
                        isCompleted: false,
                        _id: 0
                    },
                    {
                        text: 'test todo1',
                        isCompleted: false,
                        _id: 1
                    },
                ],
                areAllCompleted: false
            }, {
                type: types.COMPLETE_TODO,
                payload: 1
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                },
                {
                    text: 'test todo1',
                    isCompleted: true,
                    _id: 1
                },
            ],
            areAllCompleted: false
        })
    })

    it('should handle COMPLETE_ALL_TODOS', () => {
        expect(
            todosReducer({
                todos: [
                    {
                        text: 'test todo',
                        isCompleted: false,
                        _id: 0
                    },
                    {
                        text: 'test todo1',
                        isCompleted: true,
                        _id: 1
                    },
                ],
                areAllCompleted: false
            }, {
                type: types.COMPLETE_ALL_TODOS
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: true,
                    _id: 0
                },
                {
                    text: 'test todo1',
                    isCompleted: true,
                    _id: 1
                },
            ],
            areAllCompleted: true
        })

        expect(
            todosReducer({
                todos: [
                    {
                        text: 'test todo',
                        isCompleted: true,
                        _id: 0
                    },
                    {
                        text: 'test todo1',
                        isCompleted: true,
                        _id: 1
                    },
                ],
                areAllCompleted: true
            }, {
                type: types.COMPLETE_ALL_TODOS
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                },
                {
                    text: 'test todo1',
                    isCompleted: false,
                    _id: 1
                },
            ],
            areAllCompleted: false
        })
    })

    it('should handle CLEAR_COMPLETED', () => {
        expect(
            todosReducer({
                todos: [
                    {
                        text: 'test todo',
                        isCompleted: false,
                        _id: 0
                    },
                    {
                        text: 'test todo1',
                        isCompleted: true,
                        _id: 1
                    },
                ],
                areAllCompleted: false
            }, {
                type: types.CLEAR_COMPLETED
            })
        ).toEqual({
            todos: [
                {
                    text: 'test todo',
                    isCompleted: false,
                    _id: 0
                },
            ],
            areAllCompleted: false
        })
    })
})
