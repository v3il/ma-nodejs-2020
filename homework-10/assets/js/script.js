(async function init($) {
    const usersTable = $('#users-table');
    const usersContentBlock = $('#users-content');
    const usersForm = $('#users-form');
    const notification = $('.js-notification');

    let users;
    let timeoutId;

    showNotification('Loading users...');

    try {
        users = await getUsers();

        users.forEach(user => {
            renderUserRow(user);
        });

        usersContentBlock.show();

        hideNotification();
    } catch (error) {
        showNotification(error.responseJSON.message, 'error');
    }

    $('body')
        .on('click', '.js-edit-user', async event => {
            const row = $(event.target).closest('tr');
            const rowIndex = row.index();

            const userModel = users[rowIndex];

            usersForm.find('.js-update-user-title').show();
            usersForm.find('.js-send-form-update').show();
            usersForm.find('#login').val(userModel.login);
            usersForm.find('#password').val(userModel.password);
            usersForm.find('#id').val(userModel.id);

            usersForm.fadeIn();
        })
        .on('click', '.js-delete-user', async event => {
            const row = $(event.target).closest('tr');
            const rowIndex = row.index();

            const userModel = users[rowIndex];

            if (window.confirm(`Remove user ${userModel.login}?`)) {
                try {
                    const { affectedRows } = await deleteUser(userModel.id);
                    showNotification(`Successfully removed ${affectedRows} user`);
                    row.remove();
                } catch (error) {
                    showNotification(error, 'error');
                }
            }
        })
        .on('click', '.js-close-form', () => {
            closePopup();
        })
        .on('click', '.js-create-user-btn', () => {
            usersForm.find('.js-create-user-title').show();
            usersForm.find('.js-send-form-create').show();

            usersForm.fadeIn();
        })
        .on('click', '.js-send-form-create', async () => {
            const login = usersForm.find('#login').val();
            const password = usersForm.find('#password').val();

            try {
                const userModel = await createUser({ login, password });
                showNotification('Successfully created');

                renderUserRow(userModel);
                closePopup();
            } catch (error) {
                showNotification(error.responseJSON.message, 'error');
            }
        })
        .on('click', '.js-send-form-update', async () => {
            const id = +usersForm.find('#id').val();
            const login = usersForm.find('#login').val();
            const password = usersForm.find('#password').val();

            try {
                const userModel = await updateUser({ id, login, password });

                showNotification('Successfully updated');
                closePopup();

                const row = usersTable.find(`#user${id}`);

                row.find('.js-login').text(userModel.login);
                row.find('.js-password').text(userModel.password);
                row.find('.js-token').text(userModel.token);

                console.log(users);

                const userIndex = users.findIndex(item => item.id === id);

                console.log(userIndex);

                users.splice(userIndex, 1, {
                    id,
                    login: userModel.login,
                    password: userModel.password,
                    token: userModel.token,
                });
            } catch (error) {
                showNotification(error.responseJSON.message, 'error');
            }
        });

    async function getUsers() {
        const response = await $.get('/users');
        return response.users;
    }

    async function createUser(userData) {
        return $.post('/users', JSON.stringify(userData));
    }

    async function updateUser(userData) {
        return $.ajax({
            url: '/users',
            method: 'put',
            data: JSON.stringify(userData),
        });
    }

    async function deleteUser(userId) {
        return $.ajax({
            url: '/users',
            method: 'delete',
            data: JSON.stringify({ id: userId }),
        });
    }

    function showNotification(text, status = 'success') {
        hideNotification();

        notification
            .text(text)
            .removeClass('success error')
            .addClass(status)
            .fadeIn();

        timeoutId = setTimeout(() => {
            hideNotification();
        }, 5000);
    }

    function hideNotification() {
        clearTimeout(timeoutId);
        notification
            .stop()
            .hide()
            .text('');
    }

    function renderUserRow(user) {
        const rowHTML = `
            <tr id="user${user.id}">
                <td>${user.id}</td>
                <td class="js-login">${user.login}</td>
                <td class="js-password">${user.password}</td>
                <td class="js-token">${user.token}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-sm js-edit-user">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm js-delete-user">Delete</button>
                </td>
            </tr>
        `;

        usersTable.find('tbody').append(rowHTML);
    }

    function closePopup() {
        usersForm.fadeOut(() => {
            usersForm
                .find(
                    '.js-create-user-title, .js-update-user-title, .js-send-form-create, .js-send-form-update',
                )
                .hide();

            usersForm.find('#login, #password, #id').val('');
        });
    }
})(window.jQuery);
