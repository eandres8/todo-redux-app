import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo( 'Vencer a Thanos' );
const todo2 = new Todo( 'Salver el mundo' );
const todo3 = new Todo( 'Pedir prestado el traje de Ironman' );

const estadoInicial: Todo[] = [ todo1, todo2, todo3 ];

export function todoReducer( state = estadoInicial, action: fromTodo.Acciones ): Todo[] {
    switch ( action.type ) {

        // ===========================================================
        // Agrega un nuevo To Do
        // ===========================================================
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            return [ ...state, todo ];

        // ===========================================================
        // Cambia de estado a un To Do
        // ===========================================================
        case fromTodo.TOGGLE_TODO:
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            } );

        // ===========================================================
        // Cambia de estado de la lista de To Do
        // ===========================================================
        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            } );

        // ===========================================================
        // Modifica un To Do
        // ===========================================================
        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            } );

        // ===========================================================
        // Modifica un To Do
        // ===========================================================
        case fromTodo.BORRAR_ALL_TODO:
            return state.filter((todoEdit) => !todoEdit.completado );

        // ===========================================================
        // Borrar un To Do
        // ===========================================================
        case fromTodo.BORRAR_TODO:
            return state.filter( ( todoEdit ) => todoEdit.id !== action.id );

        default:
            return state;

    }
}
