import React, { useEffect, useState } from 'react'
import { FunctionComponent } from 'react'
import MessageComponent from './MessageComponent'
import styles from './Home.module.css'
import MessagePanel from './MessagePanel'
import styles1 from './ContactSideMenu.module.css'
import { getAllInobx, getAllUsers } from '../utils/ApiManager'
import { formatTimestamp, getUserId } from '../utils/Utils'
import { useWebSocket } from '../contexts/WebSocketContext'
import { MessageData, User, Inbox } from '../utils/Types'
import EmptyPage from './EmptyPage'
import { useAuth } from '../contexts/AuthContext'
import { getUserName } from '../utils/Utils'

const Home: FunctionComponent = () => {
  const [inboxUsers, setInboxUsers] = useState(new Map<string, MessageData>([]))

  const inboxUsersArray = [...inboxUsers.values()] // Convert the Map values to an array

  const [selectedInbox, setSelectedInbox] = useState<Inbox>()
  const [isActiveSidebar, setIsActiveSidebar] = useState('close')
  const [users, setUsers] = useState<User[]>([])
  const { messageData } = useWebSocket()
  const { logout } = useAuth()

  const handleHighlight = (inboxData: MessageData) => {
    setSelectedInbox(inboxData.inbox)
  }

  const handleCloseMessagePanel = () => {
    setSelectedInbox(undefined)
  }

  const toggleSidebar = (setting: string) => {
    setIsActiveSidebar(setting)
  }

  const updateInboxUser = (messageData: MessageData) => {
    setInboxUsers(
      (map) =>
        new Map(map.set(messageData.inbox.inboxId.toString(), messageData))
    )
    setSelectedInbox(messageData.inbox)
  }

  useEffect(() => {
    getAllInobx().then((response) => {
      const inboxData: MessageData[] = response.data

      setInboxUsers(
        new Map(
          inboxData.map((messageData) => [
            messageData.message.inboxId.toString(),
            messageData,
          ])
        )
      )
    })
  }, [])

  useEffect(() => {
    if (messageData) updateInboxUser(messageData)
  }, [messageData])

  useEffect(() => {
    if (users.length == 0) {
      getAllUsers().then((response) => {
        setUsers(response.data)
      })
    }
  }, [isActiveSidebar])

  return (
    <div className={styles.macbookAir1}>
      <div className={styles.frameParent}>
        <div className={styles.image1Parent}>
          <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
          <div className={styles.status1Parent}>
            <img className={styles.status1Icon} alt="" src="/status-1.svg" />
            <img
              className={styles.status2Icon}
              alt=""
              src="/status-2.svg"
              onClick={() => toggleSidebar('contact')}
            />
          </div>
        </div>
        <img
          className={styles.gear1Icon}
          alt=""
          src="/gear-1.svg"
          onClick={() => toggleSidebar('setting')}
        />
      </div>
      <div className={styles.messagesPanel}>
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.contentInner}>
              <div className={styles.contentInner}>
                <div className={styles.messages}>Messages</div>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
        </div>
        <div className={styles.globalList}>
          <div className={styles.globalListInner}>
            <div className={styles.searchParent}>
              <div className={styles.search}>search</div>
              <div className={styles.searchMessages}>Search messages</div>
            </div>
          </div>
          <div className={styles.messageList}>
            {inboxUsersArray
              .slice()
              .sort((a, b) => b.message.sentAt - a.message.sentAt)
              .map((inboxData, index) => (
                <MessageComponent
                  key={index}
                  imageSrc={'/user2.png'}
                  fullName={
                    inboxData.inbox.userId.toString() === getUserId()
                      ? inboxData.inbox.friendName
                      : inboxData.inbox.userName
                  }
                  time={formatTimestamp(inboxData.message.sentAt)}
                  message={inboxData.message.text}
                  isHighlighted={selectedInbox === inboxData.inbox}
                  onClick={() => handleHighlight(inboxData)}
                />
              ))}
          </div>
        </div>
      </div>
      {(selectedInbox == undefined) && <EmptyPage />}
      <div
        className={`${styles1.contactsidemenu} ${
          users && isActiveSidebar != 'close' ? styles1.active : ''
        }`}
      >
        <div className={styles1.header}>
          <div className={styles1.contactbar}>
            <div className={styles1.arrowBack1Parent}>
              <img
                className={styles1.arrowBack1Icon}
                alt=""
                src="/arrow-back-1.svg"
                onClick={()=>toggleSidebar('close')}
              />
              <div className={styles1.newChat}>{ (isActiveSidebar === 'contact')? 'New Chat' : 'Settings'}</div>
            </div>
          </div>
          <div className={styles1.divider} />
        </div>
        {isActiveSidebar == 'contact' && (
          <div className={styles1.settingGloballist}>
            <div className={styles1.contactlist}>
              {users.map((user, index) => (
                <div
                  className={styles1.contact}
                  onClick={() => {
                    toggleSidebar('close')
                    setSelectedInbox({
                      inboxId: -1,
                      userId: parseInt(getUserId()),
                      friendId: user.userId,
                      userName: getUserName(),
                      friendName: `${user.name}`,
                    })
                  }}
                >
                  <img className={styles1.imgIcon} alt="" src={'/user2.png'} />
                  <div className={styles1.contactdetail}>
                    <div className={styles1.name}>
                      <div className={styles1.elmerLaverty}>{user.name}</div>
                    </div>
                    <div className={styles1.available}>Available</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isActiveSidebar == 'setting' && (
          <div className={styles.settingGlobalList}>
            <div className={styles.settinglist}>
              <div className={styles.setting}>
                <img className={styles.settingIcon} alt="" src={'/theme.svg'} />
                <div className={styles.theme}>Theme</div>
              </div>
              <div className={styles.setting}>
                <img className={styles.settingIcon} alt="" src={'/help.svg'} />
                <div className={styles.theme}>Help</div>
              </div>
              <div className={styles.setting2} onClick={logout}>
                <img
                  className={styles.settingIcon}
                  alt=""
                  src={'/logout.svg'}
                />
                <div className={styles.theme}>Logout</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedInbox && (
        <MessagePanel
          selectedInbox={selectedInbox}
          onClose={handleCloseMessagePanel}
        />
      )}
    </div>
  )
}

export default Home
