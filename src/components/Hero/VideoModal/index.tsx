'use client';

// Imports
// ------------
import { VideoPlayer } from 'react-datocms';

// Styles + Interfaces
// ------------
import * as I from './interface';
import * as S from './styles';

// Component
// ------------
const VideoModal = ({
	modalRef,
	handleCloseModal,
	video,
	modalContentRef,
}: I.VideoModalProps) => {
	return (
		<S.Jacket ref={modalRef} onClick={handleCloseModal}>
			<S.ModalContent
				ref={modalContentRef}
				onClick={(e: React.MouseEvent<HTMLDivElement>) =>
					e.stopPropagation()
				}
			>
				<S.ModalCloseButton
					data-hover
					onClick={handleCloseModal}
					aria-label='Close video modal'
				>
					×
				</S.ModalCloseButton>
				<S.ModalVideo>
					<VideoPlayer data={video} autoPlay muted loop playsInline />
				</S.ModalVideo>
			</S.ModalContent>
		</S.Jacket>
	);
};

// Exports
// ------------
VideoModal.displayName = 'VideoModal';
export default VideoModal;
