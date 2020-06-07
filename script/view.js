import module from './module.js'

class View {
    constructor() {
        this.query = module.queryStringToJson(window.location.search.substring(1));
    }
}

class IndexView extends View {
    appendPostsInSection = result => {
        const innerHtmlArray = result.map(e => {
            const innerHtml = `
                <div class="post">
                    <div class="side">
                        <input type="checkbox" class="delete_box" name="delete_box" id="${e.id}">
                    </div>
                    <div class="post_info">
                        <span class="title"><a href="/post.html?id=${e.id}">${e.title}</a></span>
                        <span class="create_date">${e.create_date}</span>
                    </div>
                    <div class="side"></div>
                </div>`
            return innerHtml;
        })
        const postArea = document.querySelector('.post_area');
        postArea.innerHTML = innerHtmlArray.join('');
    }
    appendPageList = cnt => {
        const pageElement = document.querySelector('.page');
        pageElement.innerHTML = '';

        const ulPageNode = document.createElement('ul');
        const liNode = document.createElement('li');
        const aNode = document.createElement('a');

        const baseUrl = `?${ this.query.search_key !== undefined ? `search_key=${this.query.search_key}` : ''}`
        for (let i = 1; i <= Math.ceil(cnt / 10); i++) {
            const liElement = liNode.cloneNode();
            const aElement = aNode.cloneNode();

            aElement.textContent = i;
            aElement.setAttribute('href', `${baseUrl}&page=${i}`)
            liElement.appendChild(aElement);
            ulPageNode.appendChild(liElement);
        }

        pageElement.appendChild(ulPageNode);
    }
    changeAllCheckBox = () => {
        const allSelectCheckBox = document.querySelector("[name='all_check']");

        allSelectCheckBox.addEventListener('change', target => {
            const allDeleteCheckBox = document.getElementsByClassName('delete_box');
            for (let element of allDeleteCheckBox) {
                element.checked = target.srcElement.checked;
            }
        })
    }
    deletePosts = handler => {
        const deleteButton = document.querySelector('#delete');
        deleteButton.addEventListener('click', () => {
            const allDeleteCheckBox = document.querySelectorAll('.delete_box:checked');
            const deleteList = [];
            allDeleteCheckBox.forEach(element => {
                deleteList.push(element.getAttribute('id'));
            });
            handler(deleteList);
        });
    }
    responsiveHeader = () => {
        const changeLocation = 100;
        let ticking = false,
            lastTicking = false;
        const sectionHeaderElement = document.querySelector('.section_header');

        window.addEventListener('scroll', function (e) {
            lastTicking = ticking;
            ticking = changeLocation < this.scrollY ? true : false;

            if (lastTicking !== ticking) {
                sectionHeaderElement.classList.toggle('section_header_position');
                sectionHeaderElement.nextElementSibling.classList.toggle('blank')

            }
        });
    }
}

class PostView extends View {
    bindPost(postData) {
        const formElement = document.createElement('form');
        const inputElement = document.createElement('input');
        const titleElement = inputElement.cloneNode();
        titleElement.setAttribute('type', 'text');
        titleElement.setAttribute('id', 'title');
        titleElement.setAttribute('value', postData.title);
        formElement.appendChild(titleElement);
        const contentElement = document.createElement('textarea');
        contentElement.id = 'content';
        contentElement.textContent = postData.content;
        formElement.appendChild(contentElement);
        const submitElement = inputElement.cloneNode();
        submitElement.setAttribute('type', 'submit');
        submitElement.setAttribute('id', 'insert');
        formElement.appendChild(submitElement);

        const sectionElement = document.querySelector('.section');
        sectionElement.appendChild(formElement);
    }

    updatePost(handler) {
        const submitElement = document.querySelector('input[type="submit"]');
        submitElement.addEventListener('click', () => {
            event.preventDefault()
            const params = {
                id: this.query.id,
                title: document.querySelector('#title').value,
                content: document.querySelector('#content').value
            }
            handler(params)
        })
    }
}

export {
    IndexView,
    PostView
};