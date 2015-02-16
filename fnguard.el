;; add to *.emacs*:
;;   (load-file "path/to/fnguard.el")

(defun fnguard-comment () (interactive)
  "comment out all common use of fnguard in buffer"
  (let ((regexp "^\s*[^/]\\(fnguard\\..*\\)")
        (old-point (point)))
    (beginning-of-buffer) 
    (while (re-search-forward regexp nil t)
      (replace-match (concat "// " (match-string 1)) nil nil nil 1))
    (goto-char old-point)))

(defun fnguard-uncomment () (interactive)
  "uncomment out all common use of fnguard in buffer"
  (let ((regexp "^\s*\\(//\\)\sfnguard\\..*")
        (old-point (point)))
    (beginning-of-buffer) 
    (while (re-search-forward regexp nil t)
      (replace-match "" nil nil nil 1))
    (goto-char old-point)))
