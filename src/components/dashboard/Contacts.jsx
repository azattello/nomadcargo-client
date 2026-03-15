import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import './css/admin.css';
import { updateContacts, getContacts, updateFilialContacts, getFilialContacts } from '../../action/settings';

const Contacts = () => {
    const [phone, setPhone] = useState('');
    const [whatsappPhone, setWhatsappPhone] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');
    const [instagram, setInstagram] = useState('');
    const [telegramId, setTelegramId] = useState('');
    const [telegramLink, setTelegramLink] = useState('');
    const [contacts, setContacts] = useState({});

    const role = useSelector(state => state.user.currentUser.role);
    const selectedFilial = useSelector(state => state.user.currentUser.selectedFilial);

    useEffect(() => {
        fetchContacts();
    }, [role, selectedFilial]);

    const fetchContacts = async () => {
        try {
            let allContacts;
            if (role === 'filial' && selectedFilial) {
                allContacts = await getFilialContacts(selectedFilial);
            } else {
                allContacts = await getContacts();
            }
            setContacts(allContacts || {});
        } catch (error) {
            console.error('Ошибка при получении данных о контактах:', error);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (phone !== '' || whatsappPhone !== '' || whatsappLink !== '' || instagram !== '' || telegramId !== '' || telegramLink !== '') {
                if (role === 'filial' && selectedFilial) {
                    await updateFilialContacts(selectedFilial, phone, whatsappPhone, whatsappLink, instagram, telegramId, telegramLink);
                } else {
                    await updateContacts(phone, whatsappPhone, whatsappLink, instagram, telegramId, telegramLink);
                }
                alert('Данные успешно сохранены');
                setPhone('');
                setWhatsappPhone('');
                setWhatsappLink('');
                setInstagram('');
                setTelegramId('');
                setTelegramLink('');
                fetchContacts();
            } else {
                alert('Все поля пустые');
            }
        } catch (error) {
            alert('Ошибка при сохранении данных');
        }
    };


    return (
        <div className="status-list">
            <h1 className="status-list-title">Контакты</h1>
            <form className="form-filialAdd" onSubmit={handleSubmit}>
                <div className="inputs-wrapper-contacts">
                    <p><b>Номер для звонка</b></p>

                    <input
                        className="input-filialAdd"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+77776662233"
                    />
                    <p className="priceCurrency">
                        {contacts.phone ? `${contacts.phone}` : ''}
                    </p>                   
                </div>

                <div className="inputs-wrapper-contacts">
                    <p><b>WhatsApp номер</b></p>

                    <input
                        className="input-filialAdd"
                        type="text"
                        value={whatsappPhone}
                        onChange={(e) => setWhatsappPhone(e.target.value)}
                        placeholder="+77776662233"
                    />
                    <p className="priceCurrency">
                        {contacts.whatsappPhone ? `${contacts.whatsappPhone}` : ''}
                    </p>   
                    <input
                        className="input-filialAdd"
                        type="text"
                        value={whatsappLink}
                        onChange={(e) => setWhatsappLink(e.target.value)}
                        placeholder="https://wa.link/pf7cv0"
                    />
                    <p className="priceCurrency">
                        {contacts.whatsappLink ? `${contacts.whatsappLink}` : ''}
                    </p>                   
                </div>

                <div className="inputs-wrapper-contacts">
                    <p><b>Instagram</b></p>

                    <input
                        className="input-filialAdd"
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@qazlogistics.kz"
                    />
                    <p className="priceCurrency">
                        {contacts.instagram ? `${contacts.instagram}` : ''}
                    </p>                   
                </div>

                <div className="inputs-wrapper-contacts">
                    <p><b>Telegram</b></p>

                    <input
                        className="input-filialAdd"
                        type="text"
                        value={telegramId}
                        onChange={(e) => setTelegramId(e.target.value)}
                        placeholder="@qazlogistics.kz"
                    />
                    <p className="priceCurrency">
                        {contacts.telegramId ? `${contacts.telegramId}` : ''}
                    </p> 
                    <input
                        className="input-filialAdd"
                        type="text"
                        value={telegramLink}
                        onChange={(e) => setTelegramLink(e.target.value)}
                        placeholder="https://t.me/qazlogistics"
                    />
                    <p className="priceCurrency">
                        {contacts.telegramLink ? `${contacts.telegramLink}` : ''}
                    </p>                   
                </div>
                <button className="filialAdd-button" type="submit">Сохранить</button>


            </form>
        </div>
    );
}

export default Contacts;
