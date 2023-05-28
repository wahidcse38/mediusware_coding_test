import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(null);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isEven, setIsEven] = useState(false);



    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://contact.mediusware.com/api/contacts/?page=1');
            setContacts(response.data.results);
            setFilteredContacts(response.data.results);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const openModalA = () => {
        setShowModalA(true);
        setShowModalB(false);
        setShowModalC(false);
        window.history.pushState(null, '', '/modal-a');
    };

    const openModalB = () => {
        setShowModalA(false);
        setShowModalB(true);
        setShowModalC(false);
        window.history.pushState(null, '', '/modal-b');
    };

    const openModalC = () => {
        setShowModalC(true);
    };

    const closeModal = () => {
        console.log("Closed")
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
        window.history.pushState(null, '', '/');
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchKeyPress = (e) => {

        if (e.key === 'Enter') {
            filterContacts();
        }
        setTimeout(() => {
            filterContacts();
        }, 500)
    };

    const filterContacts = () => {
        let filtered = contacts;

        if (isEven) {
            filtered = filtered.filter((contact) => contact.id % 2 === 0);
        }

        if (searchText) {
            const search = searchText.toLowerCase();
            filtered = filtered.filter(
                (contact) =>
                    contact.country.name.toLowerCase().includes(search) ||
                    contact.phone.toLowerCase().includes(search)
            );
        }

        setFilteredContacts(filtered);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        onClick={openModalA}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        onClick={openModalB}
                    >
                        US Contacts
                    </button>
                </div>
            </div>

            {/* Modal A */}
            <Modal
                isOpen={showModalA}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: "9999",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                    content: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        border: "0",
                        background: "transparent",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "0",
                        outline: "none",
                        padding: "0",
                        maxWidth: "600px",
                        width: "50%",
                        height: "auto",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }}
                contentLabel="Modal A"

            >
                <div className='bg-white h-75' style={{ overflowY: "scroll", width: "600px", margin: "0 auto" }}>
                    <div className='sticky-top bg-white'>
                        <h3 className='fs-6 d-flex justify-content-center mb-3'>Modal A</h3>
                        <div className='d-flex justify-content-center gap-3 mb-2'>
                            <button
                                className="btn btn-outline-primary"
                                onClick={openModalA}
                                style={{ backgroundColor: '#46139f', color: '#fff' }}
                            >
                                All Contacts
                            </button>
                            <button
                                className="btn btn-outline-warning"
                                onClick={openModalB}
                                style={{ backgroundColor: '#ff7f50', color: '#fff' }}
                            >
                                US Contacts
                            </button>
                            <button className="btn btn-outline-primary" onClick={closeModal}>
                                Close
                            </button>
                        </div>


                        <div className=' w-75 mx-auto'>
                            <div className="search-container d-flex justify-content-center mb-1">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    onKeyPress={handleSearchKeyPress}
                                    placeholder="Search contacts..."
                                    style={{ width: "100%" }}
                                />
                                <button className="search-button" onClick={filterContacts}>
                                    Search
                                </button>
                            </div>
                            <div className="footer">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isEven}
                                        onChange={() => setIsEven(!isEven)}
                                    />
                                    Only even
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="contact-list  w-75 mx-auto">
                        {filteredContacts.map((contact) => (
                            <div
                                className="contact-item"
                                key={contact.id}
                                onClick={() => {
                                    openModalC()
                                    setContact(contact)
                                }}
                            >
                                {/* <h5>{contact.country.name}</h5> */}
                                <p>{contact.phone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Modal B */}
            <Modal
                isOpen={showModalB}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: "9999",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                    content: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        border: "0",
                        background: "transparent",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "0",
                        outline: "none",
                        padding: "0",
                        maxWidth: "600px",
                        width: "50%",
                        height: "auto",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }}
                contentLabel="Modal A"

            >
                <div className='bg-white p-2 h-75' style={{ overflowY: "scroll", width: "600px", margin: "0 auto" }}>
                    <div className='sticky-top bg-white'>
                        <h3 className='fs-6 d-flex justify-content-center mb-3'>Modal B</h3>
                        <div className='d-flex justify-content-center gap-3 mb-2'>
                            <button
                                className="btn btn-outline-primary"
                                onClick={openModalA}
                                style={{ backgroundColor: '#46139f', color: '#fff' }}
                            >
                                All Contacts
                            </button>
                            <button
                                className="btn btn-outline-warning"
                                onClick={openModalB}
                                style={{ backgroundColor: '#ff7f50', color: '#fff' }}
                            >
                                US Contacts
                            </button>
                            <button className="btn btn-outline-primary" onClick={closeModal}>
                                Close
                            </button>
                        </div>


                        <div className=' w-75 mx-auto'>
                            <div className="search-container d-flex justify-content-center mb-1">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    onKeyPress={handleSearchKeyPress}
                                    placeholder="Search contacts..."
                                    style={{ width: "100%" }}
                                />
                                <button className="search-button" onClick={filterContacts}>
                                    Search
                                </button>
                            </div>
                            <div className="footer">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isEven}
                                        onChange={() => setIsEven(!isEven)}
                                    />
                                    Only even
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="contact-list  w-75 mx-auto">
                        {filteredContacts.map((contact) => (
                            <div key={contact.id}>
                                {contact.country.name === 'United States' && (
                                    <div
                                        className="contact-item"

                                        onClick={() => {
                                            openModalC()
                                            setContact(contact)
                                        }}
                                    >
                                        {/* <h5>{contact.country.name}</h5> */}
                                        <p>{contact.phone}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Modal C */}
            <Modal
                isOpen={showModalC}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: "9999",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                    content: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        border: "0",
                        background: "transparent",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "0",
                        outline: "none",
                        padding: "0",
                        maxWidth: "300px",
                        width: "20%",
                        height: "auto",
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }}
                contentLabel="Modal C"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h3 style={{ width: "200px", height: "200px", background: "white", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center" }}>{contact?.phone}</h3>
            </Modal>
        </div>
    );
};

export default Problem2;
