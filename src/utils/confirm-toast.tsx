
import { useState, useCallback } from "react"
import ModalConfirm from "@/components/ui/modals/modal-confirm"
import ModalSuccess from "@/components/ui/modals/modal-success"
import { createRoot } from "react-dom/client"

type ConfirmToastOptions = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  successTitle?: string
  successDescription?: string
  onConfirm?: () => void | Promise<void>
}

export function confirmToast({
  title = "Confirm!!",
  description = "Are you sure?",
  confirmText = "Yes, Update",
  successTitle = "Success!!",
  successDescription = "Data updated successfully.",
  onConfirm
}: ConfirmToastOptions = {}) {
  return new Promise<boolean>((resolve) => {
    // Create a container for the modal
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)

    const ConfirmComponent = () => {
      const [showConfirm, setShowConfirm] = useState(true)
      const [showSuccess, setShowSuccess] = useState(false)
      const [loading, setLoading] = useState(false)

      const handleCancel = useCallback(() => {
        setShowConfirm(false)
        setTimeout(() => {
          root.unmount()
          document.body.removeChild(container)
          resolve(false)
        }, 150)
      }, [])

      const handleConfirm = useCallback(async () => {
        if (!onConfirm) {
          setShowConfirm(false)
          setTimeout(() => {
            root.unmount()
            document.body.removeChild(container)
            resolve(true)
          }, 150)
          return
        }

        try {
          setLoading(true)
          await onConfirm()
          setLoading(false)
          setShowConfirm(false)
          setShowSuccess(true)
        } catch (error) {
          setLoading(false)
          console.error('Error in confirmToast:', error)
          handleCancel()
        }
      }, [])

      const handleSuccessClose = useCallback(() => {
        setShowSuccess(false)
        setTimeout(() => {
          root.unmount()
          document.body.removeChild(container)
          resolve(true)
        }, 150)
      }, [])

      return (
        <>
          <ModalConfirm
            visible={showConfirm}
            loading={loading}
            heading={title}
            message={description}
            btnText={confirmText}
            onSubmit={handleConfirm}
            onCancel={handleCancel}
          />
          <ModalSuccess
            visible={showSuccess}
            heading={successTitle}
            message={successDescription}
            btnText="Close"
            onClose={handleSuccessClose}
          />
        </>
      )
    }

    root.render(<ConfirmComponent />)
  })
}
