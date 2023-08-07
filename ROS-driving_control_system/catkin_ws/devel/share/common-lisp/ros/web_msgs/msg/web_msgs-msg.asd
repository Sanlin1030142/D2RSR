
(cl:in-package :asdf)

(defsystem "web_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :nav_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "velocity" :depends-on ("_package_velocity"))
    (:file "_package_velocity" :depends-on ("_package"))
    (:file "velocity" :depends-on ("_package_velocity"))
    (:file "_package_velocity" :depends-on ("_package"))
    (:file "web_transfer_pkg" :depends-on ("_package_web_transfer_pkg"))
    (:file "_package_web_transfer_pkg" :depends-on ("_package"))
    (:file "web_transfer_pkg" :depends-on ("_package_web_transfer_pkg"))
    (:file "_package_web_transfer_pkg" :depends-on ("_package"))
  ))