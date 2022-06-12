import './App.css';
import {useState} from 'react';

function App() {

    const [boards, setBoards] = useState([
        {
            id: 1,
            title: 'Сделать',
            items: [{id: 1, title: 'Пойти в магазин'}, {id: 2, title: 'Выкенуть мусор'}, {id: 3, title: 'Покушать'}]
        },
        {
            id: 2,
            title: 'Проверить',
            items: [{id: 4, title: 'Код ревью'}, {id: 5, title: 'Задачи на факториал'}, {
                id: 6, title: 'Задачи на Фибоначи'
            }]
        },
        {
            id: 3,
            title: 'Сделано',
            items: [{id: 7, title: 'Снять видео'}, {id: 8, title: 'Смонтировать'}, {id: 9, title: 'Отрендерить'}]
        }
    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px white'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        e.stopPropagation()
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }))
        e.target.style.boxShadow = 'none'
    }

    function dropCardHandler(e, board) {
        // e.stopPropagation()
        board.items.push(currentItem);
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }))
        e.target.style.boxShadow = 'none'
    }

    return (
        <div className='App'>
            {boards.map(board =>
                <div className='board'
                     key={board.id}
                     onDragOver={e => dragOverHandler(e)}
                     onDrop={e => dropCardHandler(e, board)}>
                    <div className='board__title'>{board.title}</div>
                    {board.items.map(item =>
                        <div className='item'
                             key={item.id}
                             draggable={true}
                             onDragOver={e => dragOverHandler(e)}
                             onDragLeave={e => dragLeaveHandler(e)}
                             onDragStart={e => dragStartHandler(e, board, item)}
                             onDragEnd={e => dragEndHandler(e)}
                             onDrop={e => dropHandler(e, board, item)}>
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
