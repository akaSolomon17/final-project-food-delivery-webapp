import { Button } from '@nextui-org/react'

const LoadMore: React.FC<{ content: string, clickEvent: React.MouseEventHandler<HTMLButtonElement> }> = ({ content, clickEvent }) => {
    return (
        <div>
            <div className='flex w-full justify-center '>
                <Button
                    className='flex cursor-pointer w-[20rem] h-[2.5rem] border rounded-xl justify-center items-center border-[#777E90] hover:bg-[#e2e2e24d]'
                    // isLoading
                    onClick={clickEvent}>{content}</Button>
            </div>
        </div>
    )
}

export default LoadMore